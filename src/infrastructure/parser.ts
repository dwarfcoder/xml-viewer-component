export class Parser{
    public static Parse(xmlstr: string){
        if(typeof DOMParser !== 'undefined'){

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