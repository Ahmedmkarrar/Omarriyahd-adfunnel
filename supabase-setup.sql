-- ============================================================
-- SUPABASE SETUP FOR LEAD FORM
-- Run this entire script in Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query)
-- ============================================================

-- 1. CREATE THE LEADS TABLE
CREATE TABLE public.leads (
  id                     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at             TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Contact info
  first_name             TEXT NOT NULL,
  last_name              TEXT NOT NULL,
  email                  TEXT NOT NULL,
  phone                  TEXT NOT NULL,

  -- Step 1: Interest & Intent
  buyer_type             TEXT NOT NULL,
  timeline               TEXT NOT NULL,
  budget                 TEXT NOT NULL,

  -- Step 2: Viewing Preferences
  viewing_time           TEXT[] NOT NULL DEFAULT '{}',
  attendees              TEXT NOT NULL,
  has_agent              TEXT NOT NULL,

  -- Step 3: Additional
  interested_in_showing  BOOLEAN NOT NULL DEFAULT true,

  -- Lead scoring
  lead_score             INTEGER NOT NULL DEFAULT 0,
  lead_category          TEXT NOT NULL DEFAULT 'cold',
  score_timeline         INTEGER NOT NULL DEFAULT 0,
  score_buyer_type       INTEGER NOT NULL DEFAULT 0,
  score_budget           INTEGER NOT NULL DEFAULT 0,
  score_showing          INTEGER NOT NULL DEFAULT 0,

  -- Metadata
  source                 TEXT DEFAULT 'qualify-form'
);

-- Indexes
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_lead_category ON public.leads (lead_category);
CREATE INDEX idx_leads_email ON public.leads (email);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (form submissions from the website)
CREATE POLICY "Allow anonymous insert" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 3. ENABLE pg_net EXTENSION (for sending HTTP requests from triggers)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 4. CREATE EMAIL NOTIFICATION TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  resend_api_key TEXT;
  email_html TEXT;
  category_emoji TEXT;
  category_color TEXT;
  viewing_times_str TEXT;
BEGIN
  -- Get Resend API key from Supabase Vault
  SELECT decrypted_secret INTO resend_api_key
  FROM vault.decrypted_secrets
  WHERE name = 'RESEND_API_KEY'
  LIMIT 1;

  -- If no API key, skip email but still save the lead
  IF resend_api_key IS NULL THEN
    RAISE WARNING 'RESEND_API_KEY not found in vault. Email not sent for lead %', NEW.id;
    RETURN NEW;
  END IF;

  -- Category styling
  CASE NEW.lead_category
    WHEN 'hot' THEN
      category_emoji := '🔥';
      category_color := '#ef4444';
    WHEN 'warm' THEN
      category_emoji := '🌡️';
      category_color := '#f59e0b';
    ELSE
      category_emoji := '❄️';
      category_color := '#3b82f6';
  END CASE;

  -- Format viewing times array
  viewing_times_str := array_to_string(NEW.viewing_time, ', ');
  IF viewing_times_str = '' THEN
    viewing_times_str := 'Not specified';
  END IF;

  -- Build HTML email
  email_html := '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;margin:0;padding:0;background:#f9fafb;">'
    || '<div style="max-width:600px;margin:0 auto;background:#ffffff;">'
    -- Header
    || '<div style="background:#1a1a2e;padding:24px;text-align:center;">'
    || '<h1 style="color:#d4a853;margin:0;font-size:20px;">New Lead for 9805 Steelhead Rd</h1>'
    || '<div style="display:inline-block;padding:8px 20px;border-radius:24px;color:white;font-weight:bold;font-size:18px;margin:12px 0;background:' || category_color || ';">'
    || category_emoji || ' ' || UPPER(NEW.lead_category) || ' Lead &bull; Score: ' || NEW.lead_score || '/18'
    || '</div></div>'
    -- Contact Info
    || '<div style="padding:24px;">'
    || '<div style="margin-bottom:20px;">'
    || '<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Contact Information</h2>'
    || '<div style="padding:6px 0;"><span style="color:#6b7280;font-size:14px;">Name</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || NEW.first_name || ' ' || NEW.last_name || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Email</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;"><a href="mailto:' || NEW.email || '">' || NEW.email || '</a></span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Phone</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;"><a href="tel:' || NEW.phone || '">' || NEW.phone || '</a></span></div>'
    || '</div>'
    -- Buyer Profile
    || '<div style="margin-bottom:20px;clear:both;">'
    || '<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Buyer Profile</h2>'
    || '<div style="padding:6px 0;"><span style="color:#6b7280;font-size:14px;">Buyer Type</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || INITCAP(REPLACE(NEW.buyer_type, '-', ' ')) || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Timeline</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || NEW.timeline || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Budget</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || NEW.budget || '</span></div>'
    || '</div>'
    -- Viewing Preferences
    || '<div style="margin-bottom:20px;clear:both;">'
    || '<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Viewing Preferences</h2>'
    || '<div style="padding:6px 0;"><span style="color:#6b7280;font-size:14px;">Preferred Times</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || viewing_times_str || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Attendees</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || INITCAP(NEW.attendees) || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Has Agent</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || INITCAP(NEW.has_agent) || '</span></div>'
    || '<div style="padding:6px 0;clear:both;"><span style="color:#6b7280;font-size:14px;">Wants Showing</span> <span style="color:#111827;font-weight:600;font-size:14px;float:right;">' || CASE WHEN NEW.interested_in_showing THEN 'Yes' ELSE 'No' END || '</span></div>'
    || '</div>'
    -- Score Breakdown
    || '<div style="margin-bottom:20px;clear:both;">'
    || '<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:12px;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Lead Score Breakdown</h2>'
    || '<div style="background:#f9fafb;border-radius:8px;padding:16px;">'
    || '<div style="padding:4px 0;font-size:13px;"><span>Timeline</span><span style="float:right;">' || NEW.score_timeline || '/5</span></div>'
    || '<div style="padding:4px 0;font-size:13px;clear:both;"><span>Buyer Type</span><span style="float:right;">' || NEW.score_buyer_type || '/3</span></div>'
    || '<div style="padding:4px 0;font-size:13px;clear:both;"><span>Budget</span><span style="float:right;">' || NEW.score_budget || '/5</span></div>'
    || '<div style="padding:4px 0;font-size:13px;clear:both;"><span>Showing Interest</span><span style="float:right;">' || NEW.score_showing || '/5</span></div>'
    || '<div style="border-top:1px solid #d1d5db;margin-top:8px;padding-top:8px;font-weight:bold;font-size:13px;clear:both;"><span>Total</span><span style="float:right;">' || NEW.lead_score || '/18</span></div>'
    || '</div></div>'
    -- CTA Buttons
    || '<div style="text-align:center;margin-top:24px;clear:both;">'
    || '<a href="mailto:' || NEW.email || '" style="display:inline-block;background:#d4a853;color:#1a1a2e;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;margin:8px 4px;">Reply to Lead</a>'
    || '<a href="tel:' || NEW.phone || '" style="display:inline-block;background:#111827;color:#d4a853;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;margin:8px 4px;">Call Now</a>'
    || '</div></div>'
    -- Footer
    || '<div style="background:#f9fafb;padding:16px 24px;text-align:center;font-size:12px;color:#9ca3af;">'
    || '<p>Lead submitted at ' || to_char(NEW.created_at AT TIME ZONE 'America/Los_Angeles', 'Mon DD, YYYY at HH12:MI AM') || ' PT</p>'
    || '<p>9805 Steelhead Rd, Paso Robles, CA 93446</p>'
    || '</div></div></body></html>';

  -- Send email via Resend API
  PERFORM net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || resend_api_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'Steelhead Rd Leads <onboarding@resend.dev>',
      'to', ARRAY['expressre805@gmail.com'],
      'subject', category_emoji || ' New ' || INITCAP(NEW.lead_category) || ' Lead: ' || NEW.first_name || ' ' || NEW.last_name || ' (Score: ' || NEW.lead_score || '/18)',
      'html', email_html,
      'reply_to', NEW.email
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. ATTACH THE TRIGGER
CREATE TRIGGER on_new_lead_inserted
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();


-- ============================================================
-- STORE RESEND API KEY IN VAULT
-- ============================================================
SELECT vault.create_secret('re_SLEeszXS_9weWDHZykiUiSQmdxJbGtjLE', 'RESEND_API_KEY');
