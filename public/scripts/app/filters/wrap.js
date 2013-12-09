app.filter('wrap', function() {
    return function(input) {
      var out = "";
      if(input.length>50)
      {
        out = input.substring(0,50);
        out+= '. . .';
      }
      return out;
    }
});