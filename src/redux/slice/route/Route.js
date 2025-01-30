// import { createSlice } from "@reduxjs/toolkit";
// import { registration } from "../../thunk/registration/Registration";

// const initialState = {
//     route: null,
//     nevigate:null,
//     status: "idle",
//     error: null
// }

// const routeSlice = createSlice({
//     name: "route",
//     initialState,
//     reducers: {
//         resetRoute: (state) => {
//             state.route = null
//         },
//         setRoute: (state, actions) => {
//             state.route = actions.payload
//             console.log('setRoute ...',state.route);
//         },
//         setNevigate:(state, actions) => {
//             console.log('setNevigate ......');
//             state.nevigate = actions.payload
//         }
//     }
// })

// export const { resetStatus, setRoute, setNevigate } = routeSlice.actions;

// export default routeSlice