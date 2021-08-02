export class AdaptFiles {

    output(files: any[]){       
        var filesList = [];
        files.forEach((types) => {
          types.files.forEach(file => {
            var data = file.name.split(".");
            filesList.push({
              nombre: data[0],
              extension: data[1],
              contenido: file.content,
              tipo: file.type
            },
            );
          })
        })
        return filesList;
    }
}

