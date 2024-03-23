## stuff to learn

1) routing pages

```
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from "./pages/auth/index.jsx"
import { ExpenseTracker } from "./pages/expense-tracker/index.jsx"

<Router>
    <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
    </Routes>
</Router>
```

2) excessing variable somewhere else 

"export" is used

```
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

```

3) Hooks 
hooks in js are nothing but a js function, naming convention us "useFunctionname"
they are used so that we can separate the logic and ui in react, we can simply add the logic inside the index.jsx but we have to "componentize" everything so that we can reuse it and organize it efficiently 

4) useEffect
used to constantly render/listen anything
we can not use async await func inside useEffect

5) 

