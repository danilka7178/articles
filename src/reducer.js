export const initialState = {
   visibleModal: {
      addArticle: false,
      fullPost: false,
      editArticle: false,
   },
   articles: [
      // { id: "c5xa9u", image: "https://images.unsplash.com/photo-1611965765825-207969befc33?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8aG1lbnZRaFVteE18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", title: "Первая статья", text: "Это моя первая статья, привет!" },
      // { id: "nkyru0", image: "https://images.unsplash.com/photo-1611849247139-bd9bdffe21af?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGhtZW52UWhVbXhNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", title: "Это моя вторая статья, знакомо?", text: "Здесь фотка какой-то тачки" },
      // { id: "n42nqd", image: "https://images.unsplash.com/photo-1611782826454-bac2ccda6a83?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fGhtZW52UWhVbXhNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", title: "Третья", text: "Третья и крайняя статья" }
   ],
   currentPost: {},
};

export function reducer(state, action) {
   switch (action.type) {
      case 'OPEN_MODAL':
         return {
            ...state,
            visibleModal: {
               ...state.visibleModal,
               [action.payload.name]: true,
            },
            currentPost: action.payload.state,
         };
      case 'CLOSE_MODAL':
         return {
            ...state,
            visibleModal: {
               ...state.visibleModal,
               [action.payload]: false
            },
            currentPost: {},
            comments: []
         };
      case 'ADD_ARTICLE':
         return {
            articles: [
               ...state.articles,
               {
                  id: Math.random().toString(36).substring(2, 8),
                  ...action.payload
               },
            ],
            visibleModal: false,
         };
      case 'REMOVE_ARTICLE':
         return {
            ...state,
            articles: state.articles.filter((obj) => obj.id !== action.payload)
         };
      case 'GET_ARTICLES':
         return {
            ...state,
            articles: [
               ...state.articles,
               ...action.payload
            ]
         };
      case "GET_COMMENTS":
         return {
            ...state,
            comments: action.payload
         }
      case 'CLOSE_MODAL1':
         return {
            ...state,
            visibleModal: {
               ...state.visibleModal,
               [action.payload]: false
            },
            comments: []
         };
      default:
         throw new Error();
   }
};