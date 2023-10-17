export class A3ApiService {
    constructor() {

    }
    #resolveHeaders(headers){
        const myHeaders = new Headers();
        if(headers != null){
            headers.forEach(element => {
                myHeaders.append(element[0], element[1]);
            });
        }
        return myHeaders;
    }
    async _apiGet(url, headers = null, bodyContent = null, showloading = false){
        let response = await fetch(url, {
            method:'GET',
            headers:this.#resolveHeaders(headers),
            body: bodyContent
        });
        if(response.status == 200){
            return response.json();
        } else{
            throw new Error(response);
        }
    }
    async _apiPost(url, headers = null, bodyContent= null, showloading = false){
        let response = await fetch(url, {
            method:'POST',
            headers:this.#resolveHeaders(headers),
            body: bodyContent
        });
        if(response.status == 200){
            return response.json();
        } else{
            throw new Error(response);
        }
    }
    async _apiPut(url, headers = null, bodyContent = null, showloading = false){
        let response = await fetch(url, {
            method:'PUT',
            headers:this.#resolveHeaders(headers),
            body: bodyContent
        });
        if(response.status == 200){
            return response.json();
        } else{
            throw new Error(response);
        }
    }
    async _apiDelete(url, headers = null, bodyContent = null, showloading = false) {
        let response = await fetch(url, {
            method:'DELETE',
            headers:this.#resolveHeaders(headers),
            body: bodyContent
        });
        if(response.status == 200){
            return response.json();
        } else{
            throw new Error(response);
        }
    }
}