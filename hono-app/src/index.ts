import { Hono } from 'hono'

const app = new Hono()

async function timeTaken(c : any, next : any){
  if(c.req.header("Authorization")){
    const init = new Date().getTime();
    await next();
    const totalTimeRan = (new Date().getTime() - init) / 1000;
    console.log("Time taken to run the function: ", totalTimeRan);
  }else{
    return c.text('Unauthorized');
  }
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/', timeTaken, async (c) => {

  const val = await new Promise((resolve) => {
    const stop = setTimeout(() => {
      console.log("This function runs after 5 seconds");
      resolve(stop);
    }, 5 * 1000);
  });
  return c.text(`The value in val is ${val}`);

})

export default app

