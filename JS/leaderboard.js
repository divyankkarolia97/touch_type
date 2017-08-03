
$(function(){

    var userData = localStorage.getItem("userData");


    userData = JSON.parse(userData);
    var sortable = [];
    for (var data in userData) {
        sortable.push([data, parseInt(userData[data])]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });




    var table = $('#table')
    for(index in sortable){

            var app = $(`
                        <tr>
                                <td class="score">${parseInt(index)+1}</td>
                               <td>${sortable[index][0]}</td>
                                <td class="score">${sortable[index][1]}</td>

                        </tr>
        `)


        table.append(app);
    }





})



