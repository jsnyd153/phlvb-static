import type { CMSList } from "../../types/CMSList";
import type { Product } from "./type";

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
	"cmsload",
	(listInstances: CMSList[]) => {
		//get the list Instance
		//Saave copy fo the template
		// Fetch the external data
		//remove placeholders
		//create items from the extenral data
		//feed the new items into the CMSList
	},
]);
