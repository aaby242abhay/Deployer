import { Hono } from 'hono'

const app = new Hono()

async function middleware(c : any, next : any){
  if(c.req.header("Authorization")){
    await next();
  }else{
    return c.text('Unauthorized');
  }
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/', middleware, async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('This is the response from the post req in HONO!!!')
})

export default app

