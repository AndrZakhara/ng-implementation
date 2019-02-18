/* eslint-disable no-console, no-eval*/
window.myOnClick = () => {
  window.name = window.name === 'Anonime' ? 'User' : 'Anonime';
};

window.togleArticle = () => {
  const elementButton = document.querySelector('.button-article');
  const elementArticle = document.querySelector('.article');
  const isShow = eval(elementButton.getAttribute('data-value'));

  if (!isShow) {
    elementArticle.setAttribute('length', '200');
    elementButton.setAttribute('data-value', 'false');
    elementButton.value = 'Show more....';
  } else {
    elementArticle.setAttribute('length', '600');
    elementButton.setAttribute('data-value', 'true');
    elementButton.value = 'Show less....';
  }

  elementButton.setAttribute('data-value', !isShow);
};

window.article = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, impedit. Recusandae sequi eum impedit quis delectus eaque molestiae magni illo quaerat sit quos, enim rerum assumenda voluptas nesciunt iste iure dolorum et aliquid natus repudiandae non. Asperiores excepturi fuga aspernatur nulla provident, enim placeat minus illo corporis soluta laudantium est commodi minima suscipit reiciendis temporibus molestias ut rerum voluptatibus eum id doloribus accusantium? Explicabo cumque vel sequi placeat qui quidem voluptate distinctio tempore dolorem rem! Soluta esse sequi in magnam eius autem? Deleniti velit itaque voluptate nemo architecto delectus, labore dolores harum. Numquam aliquid neque id a exercitationem atque perferendis veniam culpa ducimus. Dolorem quia, magnam repellat maiores nulla tempora delectus rem aliquid voluptas voluptate, doloremque accusamus optio? Iusto tenetur autem atque mollitia quis aliquam, quod incidunt minima alias beatae dolore praesentium? Porro voluptatibus facere repellat architecto maiores. Blanditiis repellat, perspiciatis, itaque et eveniet reprehenderit quisquam repudiandae similique vitae doloremque voluptates enim quia maxime nam minima voluptatibus beatae quasi. Qui suscipit tempore repudiandae quis veritatis voluptatem. Vitae, distinctio at odit ea unde iste deserunt quisquam optio perferendis. Quos ducimus dolores molestiae dolorem. Repellat voluptatem nemo officiis, illum numquam vel. Tenetur numquam labore esse dolores similique, sed repudiandae corrupti pariatur fugiat blanditiis voluptatibus consequuntur quos quas at alias est quod fugit explicabo perspiciatis iusto nobis sapiente fuga. Quisquam perspiciatis illo deleniti explicabo totam ipsum, earum vel, obcaecati magnam repellendus quidem, accusamus id minima! Necessitatibus doloremque repudiandae cumque adipisci, sed atque nisi dolorum facilis sunt excepturi repellendus non eligendi a illum ad nemo libero reprehenderit, reiciendis mollitia, eum magni suscipit! Perferendis consequatur, consequuntur ab itaque cumque accusantium debitis error velit. Iusto dicta nemo animi omnis necessitatibus delectus aliquam libero adipisci harum soluta quibusdam, sapiente aut commodi ipsam exercitationem ratione incidunt hic culpa aliquid, quasi corrupti maxime at voluptatum. Corporis minus necessitatibus veritatis.';