export async function onRequestPost(context) {
  const body = await context.request.json();
  const { name, email, subject, message } = body || {};

  if (!name || !email || !subject || !message) {
    return Response.json(
      { ok: false, message: 'All fields are required.' },
      { status: 400 }
    );
  }

  return Response.json({
    ok: true,
    message: 'Form captured. Connect Resend, MailChannels, or your preferred email service to send real mail from this endpoint.'
  });
}
