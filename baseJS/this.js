function fn(params) {
    /*
     executionContext= {
         this:{}   //指定this
        
    }
    */

    console.log(this, '-------');
}
fn()

var obj = {
    name: 'xiaoli',
    getname: function() {
        console.log(this);
    }
}
obj.getname()


function Person() {
    console.log(this); //log打出来的是xiaoming的构造函数 Person
}

var xiaoming = new Person();