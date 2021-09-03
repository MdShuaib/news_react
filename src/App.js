import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

require('dotenv').config();
console.log(process.env);
const api_key = process.env.REACT_APP_API_KEY
const url =
  "https://newsapi.org/v2/everything?q=apple&from=2021-09-01&to=2021-09-01&sortBy=popularity&apiKey="+api_key;
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const resp = await fetch(url);
      const newsResult = await resp.json();
      setData(newsResult);
    };
    fetchData();
  }, []);
  const classes = useStyles();
  if (data.articles) {
    return (
      <div className="App">
        <h1>News Update</h1>
        {data.articles.map((item) => {
          return (
            <div className="">
              <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.urlToImage}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              </Card>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>No news available!</h1>
      </div>
    );
  }
}

export default App;
