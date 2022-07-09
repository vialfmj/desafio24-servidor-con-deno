// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";
import { contentTypeFilter, createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";



const app = createApp();
let arrayColores = []
app.post("/",contentTypeFilter("application/x-www-form-urlencoded"), async (req) => {
    try {
        const bodyForm = await req.formData();
        const color:string = bodyForm.value("color");
        arrayColores.push(color)
        await req.respond({
            status: 200,
            headers: new Headers({
              "content-type": "text/html; charset=UTF-8",
            }),
            body: ReactDOMServer.renderToString(
              <html>
                <head>
                  <meta charSet="utf-8" />
                  <title>servest</title>
                </head>
                <body>
                        <div>
                    <form action="/" method="post">
                        <div>
                            <label htmlFor="color">Ingrese un color</label>
                            <input name="color" type="color" defaultValue=""/>
                        </div>
                        <input type="submit"/>
                    </form>
                        </div>
                        <div>
                            <h1>Colores:</h1>
                            <ul>
        
                            {
                                arrayColores.map( color => {
                                    return <li>
                                                 <div style = {{"background-color": "black"}} >
                                                    <h2 style = {{ color: color}}> {color} </h2>
                                                </div>
                                        </li>
                                })
                            }
                            </ul>
                        </div>
                </body>
              </html>,
            ),
          });
    } catch (error) {
        console.log(error)    
    }
})
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
                <div>
            <form action="/" method="post">
                <div>
                    <label htmlFor="color">Ingrese un color</label>
                    <input name="color" type="color" defaultValue="" />
                </div>
                <input type="submit"/>
            </form>
                </div>
                <div>
                    colores:
                    <ul>

                    {
                        arrayColores.map( color => {
                            return <li>
                                <div style = {{"background-color": "black"}}>
                                        <h2 style = {{ color: color}}> {color} </h2>
                                </div>
                                </li>
                        })
                    }
                    </ul>
                </div>
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 8899 });