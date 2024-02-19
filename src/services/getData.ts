export default async function api(url: string){
    return fetch(url, {
        method: 'GET',
        headers: {'content-type':'application/json'}
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
})}