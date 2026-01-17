import SymptomForm from "./components/SymptomForm";
import ClinicList from "./components/ClinicList";
import NoticeBoard from "./components/NoticeBoard";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Rural Health Access Assistant</h1>

      <SymptomForm />
      <ClinicList />
      <NoticeBoard />
    </div>
  );
}

export default App;
