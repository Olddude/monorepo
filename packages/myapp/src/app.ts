import { app, authInitialize, errorHandling } from 'mylib'
import router from './router'

app.use(authInitialize)
app.use(router)
app.use(errorHandling)

export default app
