let preloading = false;

const getData = () => {
    if (!preloading) {
        preloading = true
        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {

                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebsite.innerHTML = `User URL: ${user.website}<br />--------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
                }
                preloading = false;
            })
            .catch(error => {
                console.log(error);
            })
    }
}




const scrollToEndOfPage = () => {
    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    if (sumScrollTopClientHeight >= scrollHeight) {
        getData()
    }
}
window.addEventListener('scroll', scrollToEndOfPage);
