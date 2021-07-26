export default function (name = '', action) {
    if(action.type == 'sendfirstname') {
        console.log("actionname///", action.name.userin.firstName)
        return action.name.userin.firstName;
    } else {
        return  name;
    }
}