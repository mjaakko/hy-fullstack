const blogs = [
    {
        "user": { 
            "username": "test_user_1",
            "name": "Tester1",
            "id": "test_user_1"
        },
        "author": "test_author_1",
        "title": "test_title_1",
        "url": "test_url_1",
        "likes": 5,
        "id": "9384dfnasoin"
    }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }
  