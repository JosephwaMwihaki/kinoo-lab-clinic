// Load jsPDF
const { jsPDF } = window.jspdf;

// Save data to local storage and generate PDF
function saveAndGeneratePDF() {
    // Get form data
    const patientName = document.getElementById('patientName').value;
    const date = document.getElementById('date').value;
    const wbc = document.getElementById('wbc').value;
    const rbc = document.getElementById('rbc').value;
    const hb = document.getElementById('hb').value;
    const pcv = document.getElementById('pcv').value;
    const mcv = document.getElementById('mcv').value;
    const mch = document.getElementById('mch').value;
    const mchc = document.getElementById('mchc').value;
    const platelets = document.getElementById('platelets').value;
    const neutrophils = document.getElementById('neutrophils').value;
    const lymphocytes = document.getElementById('lymphocytes').value;
    const basophils = document.getElementById('basophils').value;
    const monocytes = document.getElementById('monocytes').value;
    const easoniphil = document.getElementById('easoniphil').value;
    const esr = document.getElementById('esr').value;

    // Create a report object
    const report = {
        patientName,
        date,
        wbc,
        rbc,
        hb,
        pcv,
        mcv,
        mch,
        mchc,
        platelets,
        neutrophils,
        lymphocytes,
        basophils,
        monocytes,
        easoniphil,
        esr,
    };

    // Save to local storage
    saveReport(report);

    // Generate PDF
    generatePDF(report);
}

// Save report to local storage
function saveReport(report) {
    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
    alert('Report saved successfully!');
}

// Generate a sleek PDF
function generatePDF(report) {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Add clinic name and title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147); // Dark blue color
    doc.text('Kinoo Lab Clinic', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('Total Blood Count Report', 105, 30, { align: 'center' });

    // Add patient details
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33); // Dark gray color
    doc.text(`Patient Name: ${report.patientName}`, 20, 50);
    doc.text(`Date: ${report.date}`, 20, 60);

    // Add table headers
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147); // Dark blue color
    doc.text('Test Results', 20, 80);

    // Add table data
    let y = 90;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont('helvetica', 'bold');
    doc.text('Test', 20, y);
    doc.text('Result', 80, y);
    doc.text('Units', 120, y);
    doc.text('Normal Range', 160, y);
    y += 10;

    const tests = [
        { test: 'WBC', result: report.wbc, units: '10^P/L', normal: '4.0 – 10.0' },
        { test: 'RBC', result: report.rbc, units: '10^12/L', normal: '3.50 – 5.50' },
        { test: 'HB', result: report.hb, units: 'g/dL', normal: '12.0 – 18.0' },
        { test: 'PCV', result: report.pcv, units: '%', normal: '37.0 – 54.0' },
        { test: 'MCV', result: report.mcv, units: 'Fl', normal: '80.0 – 100.0' },
        { test: 'MCH', result: report.mch, units: 'pg', normal: '27.0 – 34.0' },
        { test: 'MCHC', result: report.mchc, units: 'g/dL', normal: '32.0 – 36.0' },
        { test: 'PLATELETS', result: report.platelets, units: '10^9/L', normal: '150 – 450' },
        { test: 'NEUTROPHILS', result: report.neutrophils, units: '%', normal: '40 – 60' },
        { test: 'LYMPHOCYTES', result: report.lymphocytes, units: '%', normal: '20 – 40' },
        { test: 'BASOPHILS', result: report.basophils, units: '%', normal: '0 – 1' },
        { test: 'MONOCYTES', result: report.monocytes, units: '%', normal: '2 – 10' },
        { test: 'EASONIPHIL', result: report.easoniphil, units: '%', normal: '0 – 6' },
        { test: 'ESR', result: report.esr, units: 'mm/hr', normal: '0 – 9' },
    ];

    doc.setFont('helvetica', 'normal');
    tests.forEach(test => {
        doc.text(test.test, 20, y);
        doc.text(test.result, 80, y);
        doc.text(test.units, 120, y);
        doc.text(test.normal, 160, y);
        y += 10;
    });

    // Save the PDF
    doc.save(`${report.patientName}_blood_count_report.pdf`);
}