import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  phone: z.string().min(1).optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  message: z.string().optional(),
  service: z.string().optional(),
  language: z.string().optional().default('en'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Log to console for now — Telegram integration will be added later
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📞 NEW LEAD');
    if (data.name) console.log(`   Name:     ${data.name}`);
    if (data.email) console.log(`   Email:    ${data.email}`);
    if (data.phone) console.log(`   Phone:    ${data.phone}`);
    if (data.service) console.log(`   Service:  ${data.service}`);
    if (data.message) console.log(`   Message:  ${data.message}`);
    console.log(`   Language: ${data.language}`);
    console.log(`   Time:     ${new Date().toISOString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Unexpected error' },
      { status: 500 }
    );
  }
}
