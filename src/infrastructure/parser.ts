export class Parser{
    public static Parse(xmlstr: string){
        if(typeof DOMParser !== 'undefined'){

            let domDoc : XMLDocument = (new DOMParser()).parseFromString(xmlstr, 'text/xml');

            // let's check for errors
            if(domDoc.querySelector('parsererror')) {
                throw new Error('XML parsing error');
            }

            return domDoc;
        }

        return null;
    }
}