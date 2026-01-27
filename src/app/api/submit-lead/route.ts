import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only when API key is available
function getResendClient() {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY);
  }
  return null;
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerType: string;
  timeline: string;
  budget: string;
  viewingTime: string[];
  attendees: string;
  hasAgent: string;
  interestedInShowing: boolean;
  agreeToTerms: boolean;
  leadScore: {
    total: number;
    category: "hot" | "warm" | "cold";
    breakdown: {
      timeline: number;
      buyerType: number;
      budget: number;
      showingInterest: number;
    };
  };
  propertyAddress: string;
  propertyPrice: number;
  submittedAt: string;
}

const buyerTypeLabels: Record<string, string> = {
  primary: "Primary Residence",
  vacation: "Vacation / Second Home",
  investment: "Investment / Rental",
  browsing: "Just Browsing",
};

const timelineLabels: Record<string, string> = {
  "0-30": "Ready Now (0-30 days)",
  "30-90": "1-3 Months",
  "3-6": "3-6 Months",
  researching: "Just Researching",
};

const budgetLabels: Record<string, string> = {
  "under-1m": "Under $1M",
  "1m-1.25m": "$1M - $1.25M",
  "1.25m-1.5m": "$1.25M - $1.5M",
  "not-sure": "Not Sure Yet",
};

const attendeeLabels: Record<string, string> = {
  solo: "Just Me",
  spouse: "Me + Spouse/Partner",
  family: "Family",
  agent: "Me + My Agent",
  virtual: "Virtual Tour First",
};

const agentLabels: Record<string, string> = {
  yes: "Yes, Has Agent",
  no: "Looking for Representation",
  open: "Open to Agent",
};

function getLeadEmoji(category: string): string {
  switch (category) {
    case "hot":
      return "🔥";
    case "warm":
      return "🟡";
    default:
      return "❄️";
  }
}

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    const leadEmoji = getLeadEmoji(data.leadScore.category);
    const leadCategory = data.leadScore.category.toUpperCase();

    // Email to agent
    const agentEmailSubject = `${leadEmoji} NEW ${leadCategory} LEAD - 9805 Steelhead Rd (Score: ${data.leadScore.total})`;

    const agentEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a0a0a, #1a1a1a); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .score-badge { display: inline-block; padding: 8px 20px; border-radius: 50px; font-weight: bold; margin-top: 15px; }
    .score-hot { background: #ef4444; color: white; }
    .score-warm { background: #f59e0b; color: white; }
    .score-cold { background: #3b82f6; color: white; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
    .info-row { display: flex; margin-bottom: 8px; }
    .info-label { color: #6b7280; width: 140px; flex-shrink: 0; }
    .info-value { color: #111827; font-weight: 500; }
    .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #d4a853; }
    .cta-button { display: inline-block; background: #d4a853; color: #0a0a0a; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px; }
    .score-breakdown { background: white; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .score-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f3f4f6; }
    .score-item:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${leadEmoji} NEW LEAD - 9805 Steelhead Rd</h1>
      <div class="score-badge score-${data.leadScore.category}">
        ${leadCategory} LEAD • Score: ${data.leadScore.total}/18
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.firstName} ${data.lastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${data.phone}">${data.phone}</a></span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Buyer Profile</div>
        <div class="info-row">
          <span class="info-label">Buyer Type:</span>
          <span class="info-value">${buyerTypeLabels[data.buyerType] || data.buyerType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Timeline:</span>
          <span class="info-value">${timelineLabels[data.timeline] || data.timeline}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Budget:</span>
          <span class="info-value">${budgetLabels[data.budget] || data.budget}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Has Agent:</span>
          <span class="info-value">${agentLabels[data.hasAgent] || data.hasAgent}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Showing Preferences</div>
        <div class="info-row">
          <span class="info-label">Preferred Times:</span>
          <span class="info-value">${data.viewingTime?.join(", ") || "Not specified"}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Attendees:</span>
          <span class="info-value">${attendeeLabels[data.attendees] || data.attendees}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Wants Showing:</span>
          <span class="info-value">${data.interestedInShowing ? "✅ Yes - This Week" : "Not immediately"}</span>
        </div>
      </div>

      ${data.interestedInShowing ? `
      <div class="highlight">
        <strong>⚡ PRIORITY:</strong> This lead wants to schedule a showing THIS WEEK. Follow up within 1 hour for best results.
      </div>
      ` : ""}

      <div class="score-breakdown">
        <strong>Lead Score Breakdown (${data.leadScore.total}/18)</strong>
        <div class="score-item">
          <span>Timeline</span>
          <span>${data.leadScore.breakdown.timeline}/5</span>
        </div>
        <div class="score-item">
          <span>Buyer Type</span>
          <span>${data.leadScore.breakdown.buyerType}/3</span>
        </div>
        <div class="score-item">
          <span>Budget Match</span>
          <span>${data.leadScore.breakdown.budget}/5</span>
        </div>
        <div class="score-item">
          <span>Showing Interest</span>
          <span>${data.leadScore.breakdown.showingInterest}/5</span>
        </div>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <a href="tel:${data.phone}" class="cta-button">📞 Call ${data.firstName} Now</a>
      </div>

      <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px;">
        Lead submitted at ${new Date(data.submittedAt).toLocaleString()}
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Email to lead (Buyer's Dossier)
    const leadEmailSubject = `Your Private Buyer's Dossier - 9805 Steelhead Rd, Paso Robles`;

    const leadEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a0a0a, #1a1a1a); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0 0 10px 0; font-size: 24px; color: #d4a853; }
    .header p { margin: 0; color: #9ca3af; }
    .price-badge { display: inline-block; background: rgba(212, 168, 83, 0.2); border: 1px solid #d4a853; color: #d4a853; padding: 8px 20px; border-radius: 50px; font-weight: bold; margin-top: 20px; }
    .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
    .greeting { font-size: 18px; margin-bottom: 20px; }
    .property-stats { display: flex; justify-content: space-around; background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .stat { }
    .stat-value { font-size: 24px; font-weight: bold; color: #d4a853; }
    .stat-label { font-size: 12px; color: #6b7280; }
    .section { margin: 30px 0; }
    .section-title { font-size: 16px; font-weight: bold; color: #111827; margin-bottom: 15px; border-bottom: 2px solid #d4a853; padding-bottom: 5px; display: inline-block; }
    .feature-list { list-style: none; padding: 0; margin: 0; }
    .feature-list li { padding: 8px 0; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; }
    .feature-list li:before { content: "✓"; color: #d4a853; margin-right: 10px; font-weight: bold; }
    .cta-section { background: linear-gradient(135deg, #0a0a0a, #1a1a1a); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
    .cta-section h3 { color: white; margin: 0 0 10px 0; }
    .cta-section p { color: #9ca3af; margin: 0 0 20px 0; }
    .cta-button { display: inline-block; background: #d4a853; color: #0a0a0a; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; }
    .agent-card { background: #f9fafb; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px; }
    .agent-avatar { width: 60px; height: 60px; background: #d4a853; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0a0a0a; font-weight: bold; font-size: 20px; }
    .agent-info h4 { margin: 0 0 5px 0; }
    .agent-info p { margin: 0; color: #6b7280; font-size: 14px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>9805 Steelhead Rd</h1>
      <p>Paso Robles, CA 93446</p>
      <div class="price-badge">$1,195,000</div>
    </div>

    <div class="content">
      <p class="greeting">Hi ${data.firstName},</p>

      <p>Thank you for your interest in this stunning Mediterranean estate near Lake Nacimiento. As promised, here's your exclusive Buyer's Dossier with all the details you need to make an informed decision.</p>

      <div class="property-stats">
        <div class="stat">
          <div class="stat-value">4</div>
          <div class="stat-label">Bedrooms</div>
        </div>
        <div class="stat">
          <div class="stat-value">3.5</div>
          <div class="stat-label">Bathrooms</div>
        </div>
        <div class="stat">
          <div class="stat-value">2,856</div>
          <div class="stat-label">Sq Ft</div>
        </div>
        <div class="stat">
          <div class="stat-value">1 Acre</div>
          <div class="stat-label">Lot Size</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Property Highlights</div>
        <ul class="feature-list">
          <li>Authentic Mediterranean architecture with modern updates</li>
          <li>Panoramic views of hills and Lake Nacimiento area</li>
          <li>Gourmet chef's kitchen with premium appliances</li>
          <li>Primary suite with spa-like bathroom and private balcony</li>
          <li>ADU/guest house potential in detached garage</li>
          <li>Located in prestigious Heritage Ranch community</li>
          <li>Minutes from Lake Nacimiento and wine country</li>
        </ul>
      </div>

      <div class="cta-section">
        <h3>Ready to See It in Person?</h3>
        <p>Private showings are being scheduled this week. Reserve your spot before it's gone.</p>
        <a href="https://calendly.com" class="cta-button">Book Your Private Tour</a>
      </div>

      <div class="section">
        <div class="section-title">Your Dedicated Agent</div>
        <div class="agent-card">
          <div class="agent-avatar">OR</div>
          <div class="agent-info">
            <h4>Omar Riyad</h4>
            <p>Luxury Real Estate Advisor • Revel Real Estate</p>
            <p><strong>Direct:</strong> 805.268.3615 | omar@revelrealestate.com</p>
          </div>
        </div>
      </div>

      <p>I'll be reaching out shortly to answer any questions and discuss the property in more detail. In the meantime, feel free to call or text me directly.</p>

      <p>Looking forward to connecting,<br><strong>Omar Riyad</strong></p>
    </div>

    <div class="footer">
      <p>Revel Real Estate | DRE #02052562</p>
      <p>This email was sent because you requested information about 9805 Steelhead Rd.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send emails using Resend
    const resend = getResendClient();
    if (resend) {
      try {
        // Send to agent
        await resend.emails.send({
          from: "Property Leads <leads@yourdomain.com>",
          to: ["omar@revelrealestate.com"],
          subject: agentEmailSubject,
          html: agentEmailHtml,
        });

        // Send to lead
        await resend.emails.send({
          from: "Omar Riyad | Revel Real Estate <omar@yourdomain.com>",
          to: [data.email],
          subject: leadEmailSubject,
          html: leadEmailHtml,
        });
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Continue even if email fails - we still want to log the lead
      }
    } else {
      console.log("Resend API key not configured - emails not sent");
    }

    // Log the lead for development/debugging
    console.log("New lead submitted:", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      leadScore: data.leadScore,
      submittedAt: data.submittedAt,
    });

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, message: "Error processing lead" },
      { status: 500 }
    );
  }
}
