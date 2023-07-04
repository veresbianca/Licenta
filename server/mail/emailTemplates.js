const generateRegisterConfirmationEmail = ({ username, email, userRole }) => ({
  from: "HealthyStudio <healthystudio.noreply@app.com",
  to: email,
  subject: `Bine ai venit pe HealthyStudio, ${username}`,
  html: `<h1>Bine ai venit!</h1>\
        <p>Esti inregistrat in platforma HealthyStudio, cu numele de ${username}.</p>
        ${userRole !== "Client" ? `<p>Esti inregistrat cu un rol de: ${userRole}</p>` : ""}
        `,
});

const generatePaymentSuccesfulEmail = ({ username, email }) => ({
  from: "HealthyStudio <healthystudio.noreply@app.com",
  to: email,
  subject: `Plata abonament, ${username}`,
  html: `<h1>Plata a fost inregistrata cu succes!</h1>\
        <p>Plata abonamentului a fost inregistrata cu succes.</p>
        <p>Acum te poti bucura de toate avantajele pe care ti le putem oferi!</p>
        <p>In pagina de profil poti gasi mai multe detalii despre abonamentul achizitionat.</p>
        `,
});

const generateRemoveAccountEmail = ({ username, email }) => ({
  from: "HealthyStudio <healthystudio.noreply@app.com",
  to: email,
  subject: `Anulare subscriptie, ${username}`,
  html: `<h1>Doresc anularea subscriptiei!</h1>`,
});

module.exports = {
  generateRegisterConfirmationEmail,
  generatePaymentSuccesfulEmail,
  generateRemoveAccountEmail,
};
