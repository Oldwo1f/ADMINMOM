app.factory('handleEditProject', function () {
        var data = {};

        return {
            save:function (name , desc ) {
                data.name = name;
                data.desc = desc;
                console.log(data);
            },
            get:function () {
                return data;
            }
        };
    });