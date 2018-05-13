export class Parser{
    public static Parse(xmlstr: string){
        if(typeof DOMParser !== 'undefined'){

            // const DOMParser = new Components.Constructor("@mozilla.org/xmlextras/domparser;1", "nsIDOMParser");
            // var parser = new DOMParser();
            // parser.init();
            // var doc = parser.parseFromString(xmlstr, "application/xml");

            let domDoc = (new DOMParser()).parseFromString(xmlstr, 'application/xml');

            // let's check for errors
            if(domDoc.documentElement.nodeName == "parsererror"){
                throw new Error('XML parsing error');
            }

            return domDoc;
        }

        return null;
    }
}