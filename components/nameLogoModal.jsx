import NameLogo from './nameLogo';

export default function NameLogoModal() {
    return(
        <div className = "grid grid-rows-2"><NameLogo className = ""/> <div className="py-2 ml-4"><ul className="invisible md:visible grid grid-cols-subgrid grid-cols-4 gap-2" ><li >About</li><li>Contact</li><li className="ml-3">Blog</li><li >Projects</li></ul></div></div>
    );
}