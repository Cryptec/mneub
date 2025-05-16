import './Datenschutz.css';

const Datenschutz = () => {
  return (
    <div className="datenschutz">
      <div className="container">
        <h1>Datenschutz</h1>
        <div className="datenschutz-content">
          <h2>1. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben eine einfache Übersicht darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

          <h2>2. Hosting</h2>
          <p>Wir hosten unsere Website bei folgendem Anbieter:</p>
          <p>Martin Neubauer<br />
          [Strasse]<br />
          [PLZ] [Stadt]</p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
          <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Diese Erklärung erläutert, welche Informationen wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
          <p>Hinweis: Bei der Übertragung von Daten im Internet (z.B. bei der Kommunikation per E-Mail) können Sicherheitslücken auftreten. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>

          <h2>4. Recht auf Auskunft, Löschung, Sperrung</h2>
          <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>

          <h2>5. Server-Log-Files</h2>
          <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
          <ol>
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Host-Name des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ol>
          <p>Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.</p>

          <h2>6. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfrage, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
          <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>

          <h2>7. Kontaktaufnahme</h2>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>

          <h2>8. Recht auf Widerspruch</h2>
          <p>Werden Ihre Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, ohne Zahlung von Gebühren gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke der solchen Werbung zu widersprechen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.</p>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
