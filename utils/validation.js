export const validateEmail = (email) => {
    const regextSt = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regextSt.test(email);
}


export const validateCreateProduct = (product, images) => {
    let sizes = product.sizes;
    let details = product.details;
    let questions = product.questions;

    const checks = [{
        msg: 'Name, Description, Brand added successfully.',
        type: "success"
    }];

    if(images.length < 3) {
        checks.push({
            msg: `Choose atleast 3 images (${3 - images.length} remaining).`,
            type: "error"
        })
    } else {
        checks.push({
            msg: `Atleast 3 images choosen.`,
            type: "success"
        })
    } 
    if (!product.color.color) {
        checks.push({
            msg: `Choose a main product color.`,
            type: "error"
        })
    } else {
        checks.push({
            msg: `Product color has been choosen.`,
            type: "success"
        })
    }
    if (!product.color.image) {
        checks.push({
            msg: `Choose a main product style image.`,
            type: "error"
        })
    } else {
        checks.push({
            msg: `Product style image has been choosen.`,
            type: "success"
        })
    }
    for (let i = 0; i < sizes.length; i++ ) {
        if(sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "" ) {
            checks.push({
                msg: `Please fill all information on sizes.`,
                type: "error"
            })
            break;
        } else {
            checks.push({
                msg: `Atleast one size added.`,
                type: "success"
            })
        }
    }
    for (let i = 0; i < details.length; i++ ) {
        if(details[i].name == "" || details[i].value == "" ) {
            checks.push({
                msg: `Please fill all information on details.`,
                type: "error"
            })
            break;
        } else {
            checks.push({
                msg: `Atleast one details added.`,
                type: "success"
            })
        }
    }
    for (let i = 0; i < questions.length; i++ ) {
        if(questions[i].question == "" || questions[i].answer == "" ) {
            checks.push({
                msg: `Please fill all information on questions.`,
                type: "error"
            })
            break;
        } else {
            checks.push({
                msg: `Atleast one question added.`,
                type: "success"
            })
        }
    }
    let s_test = checks.find((item) => item.type === "error");

    if(s_test) {
        return checks;
    } else {
        return "valid";
    }
}