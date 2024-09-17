import Metronome from "./Metronome";

function ToolsNav() {
    return ( 
<div className="drawer max-w-40 mt-5">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Tools</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li><a><Metronome /></a></li>
      <li><a>Highlight</a></li>
    </ul>
  </div>
</div>
    );
}

export default ToolsNav;