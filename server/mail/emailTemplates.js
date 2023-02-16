const generateRegisterConfirmationEmail = ({ username, email }) => ({
  from: "HealthyStudio <healthystudio.noreply@app.com",
  to: email,
  subject: `Bine ai venit pe HealthyStudio, ${username}`,
  html: `<h1>Bine ai venit!</h1>\
        <p>Da click aici ca sa ajungi pe platforma si sa te loghezi</p>
        <a href="http://duckduckgo.com" target="_blank">Logheza-te aici</a>
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
        <p>Pentru intrebari, ne poti contacta la adresa urmatoare: </p>
        <a href="http://duckduckgo.com" target="_blank">Contacteaza-ne aici</a>
        `,
});

const generateRemoveAccountEmail = ({ username, email }) => ({
  from: "HealthyStudio <healthystudio.noreply@app.com",
  to: email,
  subject: `Stergere cont, ${username}`,
  html: `<h1>Doresc stergerea contului!</h1>`,
});

module.exports = {
  generateRegisterConfirmationEmail,
  generatePaymentSuccesfulEmail,
  generateRemoveAccountEmail,
};
