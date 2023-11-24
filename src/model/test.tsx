import React from "react";

const useCECI_EST_UN_HOOK_CUSTOM = () => {
  const s = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const res = await Promise.resolve("OUAIS");
    console.log(res);
  };
  return { s };
};
export function App() {
  const controller = useCECI_EST_UN_HOOK_CUSTOM();
  return (
    <div className="App">
      <form onSubmit={(e) => controller.s(e)}>
        <button type="submit">AAAAAAAAA</button>
      </form>
    </div>
  );
}
