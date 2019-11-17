let listService = (function(){
    // Делает заданное колво копий нашего массива
    function dublicateData (arr,count){
        let rez = [];
        for(let i = 0; i <= count; i++){
            rez = rez.concat(arr.map(item => Object.assign(item)));
        }
        return rez;
    }

    // Создаем шаблон строки
    function createTemplate (elem){
        return `<tr>
            <th scope="row">
                <input type="checkbox">
            </th>
            <td>${elem.id}</td>
            <td>${elem.name}</td>
            <td>${elem.username}</td>
            <td>${elem.role}</td>
            <td>${elem.email}</td>
            <td data-toggle="tooltip" title="${elem.address.zipcode},${elem.address.city},${elem.address.street}">${elem.address.city}</td>
            <td>${elem.website}</td>
            <td>
                <div class="center">
                    <a href="#" data-row-id="${elem.id}" class="btn btn-primary btn-sm">Открыть</a>
                </div>
            </td>
        </tr>`;
    }

    // Сортировка строки AZ
    function sortEmailAZ(a,b){
        return a.email > b.email ? 1 : -1;
    }
    // Сортировка строки ZA
    function sortEmailZA(a,b){
        return a.email < b.email ? 1 : -1;
    }

    // Сортировка строки Admin
    function sortAdmin (item){
        return item.role === "Admin";
    }
    // Сортировка строки User
    function sortUser (item){
        return item.role === "User";
    }

    // hideElem - скрывает  блокb
    function hideElem(elem){
        elem.classList.add('hide');
    }

    // showElem - отображаем блоки
    function showElem(elem){
        elem.classList.remove('hide');
    }

    // Отображение подробной информации
    function templateDetails(elem){
        return `
            <p>Имя пользователя - ${elem.name}<p>
            <p>Статус пользователя - ${elem.role}<p>
            <p>Email пользователя - ${elem.email}<p>
            <h4>Подробнее о пользователе</h4>
            <p>Адрес пользователя - ${elem.address.suite} : ${elem.address.street} : ${elem.address.city}<p>
            <p>Сайт пользователя - ${elem.website}<p>
        `;
    }
    // Поллучение данных с сервера - Промисы
    function getdata(url){
        return new Promise((resolve, reject) =>{
            const xhr = new XMLHttpRequest();

            xhr.open('GET', url , true);
            xhr.onload = function(){
                if (xhr.status === 200){
                    resolve(xhr.responseText);
                } else {
                    reject(`Произошла ошибка - ${xhr.statusText}`);
                }
            };
            xhr.send();
        });
    }
    // Отправка данных на сервер
    function sendData(url, data){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function(){
                console.log(xhr.status);
                if (xhr.status === 201){
                    resolve(xhr.response);
                } else {
                    reject(new Error (` Big Error => ${xhr.statusText}`));
                }
            }
            
            xhr.send(JSON.stringify(data));
        });
    }

    // Внешний интерфейс
    return {
        dublicateData,
        createTemplate,
        sortEmailAZ,
        sortEmailZA,
        sortAdmin,
        sortUser,
        templateDetails,
        hideElem,
        showElem,
        getdata,
        sendData
    }
})();

// let test = listService.dublicateData(users,2);
// console.log(test);