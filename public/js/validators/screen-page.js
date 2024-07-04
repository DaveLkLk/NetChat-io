export function queryScreenPage(size, object, string){
    if(!(object instanceof Object) || typeof(size) !== 'number'){
        return console.log("parametros invalidos", typeof(size), typeof(object));
    }
    function showAlert(){
        console.log("hola");
        createAlert(
            object.container,
            object.message,
            object.class,
            object.arr
        );
    }
    function minSize(){
        if(screen.width < size){
            console.log(size, object, string);
            return showAlert()
        }
    }
    function maxSize(){
        if(screen.width > size){            
            console.log(size, object, string);
            showAlert()
        }
    }
    if(string === 'min'){
         minSize
    }
    if(string === 'max'){

        maxSize()
    }
}