$(document).ready(function () {

  let url = "https://newsapi.org/v2/top-headlines?country=ph&category=health&apiKey=fd449250b00d4d0e844148134a0310e5";

  $.ajax({
      url: url,
      method: "GET",
      dataType: "JSON",
      

      beforeSend: function () {
          $(".progress").show();
      },

      complete: function () {
          $(".progress").hide();
      },

      success: function (newsdata) {
          let output = "";
          let latestNews = newsdata.articles;
          var imageurl = "";
          var author = "";
         
          for (var i in latestNews) {
              if (latestNews[i].urlToImage == null) {
               
                  imageurl = "https://i.ibb.co/m6J6j0H/News.png";
              } else {
                  imageurl = latestNews[i].urlToImage;
              }

              if (latestNews[i].author == null) {
                  author = latestNews[i].source.name;
              } else {
                  author = latestNews[i].author;
              }
              console.log(imageurl);
              output += `
        <div class="col l4 m6 s12">
        <div class="card medium hoverable">
          <div class="card-image">
            <img src="${imageurl}" class="responsive-img" alt="${latestNews[i].title}">
          </div>
          <div class="card-content">
            <span class="card-title activator"><i class="material-icons right"></i></span>
            <h6 class="truncate">Title: <a href="${latestNews[i].url}" title="${latestNews[i].title}">${latestNews[i].title}</a></h6>
            <p><b>Author</b>: ${author} </p>
            <p><b>News source</b>: ${latestNews[i].source.name} </p>
            <p><b>Published</b>: ${latestNews[i].publishedAt} </p>
          </div>

          <div class="card-reveal">
            <span class="card-title"><i class="material-icons right">close</i></span>
            <p><b>Description</b>: ${latestNews[i].description}</p>
          </div>

          <div class="card-action">
            <a href="${latestNews[i].url}" target="_blank" class="btn">Read More</a>
          </div>
         </div>
        </div>
      `;
          }

          if (output !== "") {
              $("#newsResults").html(output);
          }

      },

      error: function () {
          let errorMsg = `<div class="errorMsg center">Some error occured</div>`;
          $("#newsResults").html(errorMsg);
      }
  })

});
