import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [taxisnet, setTaxisnet] = useState(null);
  const [dob, setDob] = useState('');
  const [income, setIncome] = useState('');
  const [residence, setResidence] = useState(null);
  const [citizenship, setCitizenship] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (taxisnet === false) {
        setError('Απαιτούνται κωδικοί taxisnet για την είσοδο στο σύστημα.');
        return;
      }
      if (taxisnet === null) {
        setError('Παρακαλώ επιλέξτε αν έχετε κωδικούς taxisnet.');
        return;
      }
    }
    if (step === 2) {
      const birthDate = new Date(dob);
      const cutoffDate = new Date('2020-01-01');
      if (birthDate < cutoffDate) {
        setError('Το παιδί πρέπει να έχει γεννηθεί στην Ελλάδα από 1-1-2020.');
        return;
      }
    }
    if (step === 3) {
      if (parseFloat(income) > 40000) {
        setError('Το ισοδύναμο οικογενειακό εισόδημα δεν πρέπει να υπερβαίνει τα 40.000,00 ευρώ ετησίως.');
        return;
      }
    }
    if (step === 4) {
      if (residence === false) {
        setError('Πρέπει να διαμένετε μόνιμα και νόμιμα στην Ελλάδα.');
        return;
      }
      if (residence === null) {
        setError('Παρακαλώ επιλέξτε αν διαμένετε μόνιμα και νόμιμα στην Ελλάδα.');
        return;
      }
      if (
        citizenship !== 'Ελληνική' &&
        citizenship !== 'Ομογενής' &&
        citizenship !== 'Ευρωπαίος' &&
        citizenship !== 'ΕΟΧ' &&
        citizenship !== 'Τρίτη χώρα'
      ) {
        setError('Πρέπει να έχετε την κατάλληλη ιδιότητα πολίτη.');
        return;
      }
    }
    setStep(step + 1);
    setError('');
  };

  const steps = [
    <div key="step-0">
      <p>Καλώς ήλθατε στην Υπηρεσία Αίτησης Επιδόματος Γέννησης. Πώς μπορούμε να σας βοηθήσουμε σήμερα;</p>
      <button onClick={() => setStep(1)}>Έναρξη Αίτησης</button>
      <button onClick={() => setStep(-1)}>Συχνές Ερωτήσεις</button>
    </div>,
    <div key="step-1">
      <p>Βήμα 1: Έχετε κωδικούς taxisnet;</p>
      <label>
        <input type="radio" name="taxisnet" value="yes" onChange={() => setTaxisnet(true)} /> Ναι
      </label>
      <label>
        <input type="radio" name="taxisnet" value="no" onChange={() => setTaxisnet(false)} /> Όχι
      </label>
      <button onClick={handleNext}>Επόμενο</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>,
    <div key="step-2">
      <p>Βήμα 2: Παρακαλώ εισάγετε την ημερομηνία γέννησης του παιδιού:</p>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <button onClick={handleNext}>Επόμενο</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>,
    <div key="step-3">
      <p>Βήμα 3: Παρακαλώ εισάγετε το ετήσιο οικογενειακό εισόδημα:</p>
      <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Ετήσιο Εισόδημα" />
      <button onClick={handleNext}>Επόμενο</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>,
    <div key="step-4">
      <p>Βήμα 4: Διαμένετε μόνιμα και νόμιμα στην Ελλάδα;</p>
      <label>
        <input type="radio" name="residence" value="yes" onChange={() => setResidence(true)} /> Ναι
      </label>
      <label>
        <input type="radio" name="residence" value="no" onChange={() => setResidence(false)} /> Όχι
      </label>
      <p>Ποια είναι η ιδιότητά σας;</p>
      <select value={citizenship} onChange={(e) => setCitizenship(e.target.value)}>
        <option value="">Επιλέξτε</option>
        <option value="Ελληνική">Έλληνας πολίτης</option>
        <option value="Ομογενής">Ομογενής</option>
        <option value="Ευρωπαίος">Ευρωπαίος πολίτης</option>
        <option value="ΕΟΧ">Πολίτης ΕΟΧ</option>
        <option value="Τρίτη χώρα">Πολίτης τρίτης χώρας</option>
        <option value="Γαλλική">Γάλλος πολίτης</option>
      </select>
      <button onClick={handleNext}>Επόμενο</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>,
    <div key="step-5">
      <p>Ευχαριστούμε. Η αίτησή σας για επίδομα γέννησης έχει ληφθεί.</p>
      <p>Θα επεξεργαστούμε την αίτησή σας και θα σας ειδοποιήσουμε μόλις είναι έτοιμο.</p>
    </div>,
  ];

  const faq = (
    <div>
      <h2>Συχνές Ερωτήσεις</h2>
      <p><strong>Ε1: Ποια έγγραφα απαιτούνται;</strong></p>
      <p>Α1: Χρειάζεστε κωδικούς taxisnet, βεβαίωση γέννησης του παιδιού, και πιστοποιητικό κατοικίας.</p>
      <p><strong>Ε2: Πόσος χρόνος απαιτείται για την επεξεργασία;</strong></p>
      <p>Α2: Η διαδικασία συνήθως διαρκεί 5-7 εργάσιμες ημέρες.</p>
      <p><strong>Ε3: Μπορώ να υποβάλω αίτηση online;</strong></p>
      <p>Α3: Ναι, μπορείτε να υποβάλετε αίτηση online μέσω της επίσημης ιστοσελίδας μας.</p>
      <button onClick={() => setStep(0)}>Πίσω</button>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Αίτηση για Επίδομα Γέννησης</h1>
        {step === -1 ? faq : steps[step]}
      </header>
    </div>
  );
}

export default App;