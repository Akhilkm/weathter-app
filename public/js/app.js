// fetch('http://localhost:3000/weather?address=ernakulam').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loc = document.querySelector('#location')
const message = document.querySelector('#message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                loc.textContent
                loc.textContent = data.location
                message.textContent = data.data
            }
        })
    })

    
})

// function search() {
// 	$.ajax({
// 		type: "GET",
// 		url: "/weather?address=ernakulam",
// 		dataType: "json",
// 		success: function (result) {
// 			var res = result.status;
// 			if (res == "NotValid") {
// 				$('#err').text('username or password incorrect');
// 				hideloader();
// 			} else if (res == "paymentfailed") {
// 				$('#err').text('Payment not processed. Contact support@kuberiter.com');
// 				hideloader();
// 			} else {
// 				window.location.href = "/kubeline";
// 			}
// 		},
// 		error: function (result) {
// 			// window.location.href="error404";
// 			console.log("error", result);
// 		}
// 	});
// }

