{/* <li>
                    <div class="block_name">
                        <p class="post_name">name</p>
                    </div>
                    <div class="lower_block">
                        <div class="post_comments">
                            <button class="add_comment">Добавить коммент</button>
                            <ul>
                                <li>
                          
                                </li>
                            </ul>
                        </div>
                        <div class="post_evaluator">
                            <div class="like"><i class="fa-solid fa-thumbs-up i-like" style="color: #00ff11;"></i>12</div>
                            <div class="dislike"><i class="fa-solid fa-thumbs-down i-dislike" style="color: #ff0000;"></i>12</div>
                        </div>
                    </div>
                </li> */}


const list = document.querySelector('.products')
const getBtn = document.querySelector('.get')
const postBtn = document.querySelector('.post')
const patchBtn = document.querySelector('.patch')
const deleteBtn = document.querySelector('.delete')
const commentbtn = document.querySelector(".likeBtn")

const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
const getLike = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
const getDislike = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
const postData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const postDataComment = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const patchData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const delData = url => {
	return new Promise((resolve, reject) =>
		fetch(url, { method: 'DELETE' })
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

// отобразить все продукты
getBtn.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const products = await getData('http://localhost:3000/POSTS')
		products.forEach(element => {
			list.insertAdjacentHTML(
				`beforeend`,
				`
            <li>
                <div class="block_name">
                    <p class="post_name">${element.name}</p>
                </div>
                <div class="lower_block">
                    <div class="post_comments">
                        <ul>
                        ${
                            element.comments.map(comment => `<li>${comment}</li>`).join('')
                          }
                        </ul>
                    </div>
                    <div class="post_evaluator">
                        <div class="like"><i class="fa-solid fa-thumbs-up i-like" style="color: #00ff11;"></i>${element.like}</div>
                        <div class="dislike"><i class="fa-solid fa-thumbs-down i-dislike" style="color: #ff0000;"></i>${element.dislike}</div>
                    </div>
                </div>
            </li>
			`
			)
		})
	} catch (error) {
		console.log(error)
	}
})

// добавить новый продукт
postBtn.addEventListener('click', async e => {
	e.preventDefault()
	let name = prompt('введите название')
	let like = +prompt('введите кол-во лайков')
	let dislike = prompt('введите кол-во дизлайков')
	let comments = prompt('введите комменты').split(', ')
	try {
		await postData('http://localhost:3000/POSTS', {
			id: name.trim(''),
			name,
			like,
			dislike,
			comments
		}).then(response => {
			console.log(response, 'данные успешно добавлены')
		})
	} catch (error) {
		console.error(error)
	}
})

deleteBtn.addEventListener('click', async e => {
	e.preventDefault()
	const id = prompt('введите id')
	try {
		delData(`http://localhost:3000/POSTS/${id}`).then(response => {
			console.log(response, `продукт с id = ${id} успешно удалён`)
		})
	} catch (err) {
		console.error(err, 'ошибка при удалении')
	}
})

//  изменить продукт
commentbtn.addEventListener('click', async e => {
 	e.preventDefault()
	let id = prompt('введите имя поста')
 	let like = prompt('введите кол-во лайков')
	let dislike = prompt('введите кол-во дизлайков')
 	
 	try {
 		await patchData(`http://localhost:3000/POSTS/${id}`, {
 			like,
 			dislike
 		}).then(response => {
 			console.log(response, 'данные успешно обновлены')
 		})
 	} catch (error) {
 		console.error(error, 'не получилось обновить данные')
 	}
 })


