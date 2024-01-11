class View {
  toggleMenu() {
    document.querySelector('.header-menu-button').classList.toggle('active');
    document.querySelector('.header-close-button').classList.toggle('active');

    document.querySelector('.aside').classList.toggle('aside-open');
  }

  formatCurrency(price) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(price);
  }

  formatNumbers(amount) {
    return new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
    }).format(amount);
  }

  switchArticle(newPage, currentPage) {
    const curArticle = document.querySelector(`.article-${currentPage}`);
    const newArticle = document.querySelector(`.article-${newPage}`);
    console.log(curArticle);
    console.log(newArticle);

    if (curArticle !== newArticle) {
      curArticle.classList.add('hidden');
      newArticle.classList.remove('hidden');
      console.log('switched');
    }
  }

  displayMedicines(medicines, curPage) {
    // clear existing data
    if (document.querySelector('.article-h3-medicines'))
      document.querySelector('.article-h3-medicines').remove();
    if (document.querySelector('.article-table-medicines'))
      document.querySelector('.article-table-medicines').remove();
    if (document.querySelector('.article-h4'))
      document.querySelector('.article-h4').remove();

    let sum = 0;
    let markup = '';

    if (medicines === undefined || medicines.length === 0) {
      // if no medicines, show message
      markup += `<h3 class="article-h3 article-h3-medicines">No medicine on file</h3>`;
    } else {
      // if medicines is not empty
      markup += `
      <table class="article-table article-table-medicines">
        <thead>
          <tr class="article-table-row">
            <th class="article-table-data">Medicine</th>
            <th class="article-table-data">Qty</th>
            <th class="article-table-data">Price</th>
            <th class="article-table-data">Total</th>
          </tr>
        </thead>
      <tbody>`;

      // loop every item of medicines
      medicines.forEach((el) => {
        markup += `
        <tr class="article-table-row">
          <td class="article-table-data">${el.name}</td>
          <td class="article-table-data">${this.formatNumbers(el.quantity)}</td>
          <td class="article-table-data">${this.formatNumbers(
            el.sellingPrice
          )}</td>
          <td class="article-table-data">${this.formatNumbers(el.total)}</td>
        </tr>`;
        sum += el.total;
      });

      // display total at end of table
      markup += `
        </tbody>
      </table>
      <h4 class="article-h4">Total = ${this.formatCurrency(sum)}</h4>`;
    }

    console.log(document.querySelector(`.article-${curPage}`));
    // insert table to html
    document
      .querySelector(`.article-${curPage}`)
      .insertAdjacentHTML('beforeend', markup);
  }

  displayOintments(ointments, curPage) {
    // clear existing data
    if (document.querySelector('.article-h3-ointment'))
      document.querySelector('.article-h3-ointment').remove();
    if (document.querySelector('.article-table-ointments'))
      document.querySelector('.article-table-ointments').remove();

    let markup = '';
    // if no ointments. display message.
    if (ointments === undefined || ointments.length === 0) {
      markup += `<h3 class="article-h3 article-h3-ointment">No ointment on file</h3>`;
    } else {
      // if ointment is not empty

      // ointment table headers
      markup += `
      <table class="article-table article-table-ointments">
        <thead>
          <tr class="article-table-row">
          <th class="article-table-data">Ointment</th>
          <th class="article-table-data">Qty</th>
          </tr>
        </thead>
        <tbody>`;

      // loop every ointment element
      ointments.forEach((el) => {
        markup += `
        <tr class="article-table-row">
          <td class="article-table-data">${el.name}</td>
          <td class="article-table-data">${el.amount} ${el.unit}</td>
        </tr>`;
      });

      // close table markup
      markup += `
        </tbody>
      </table>`;
    }

    // insert markup to html
    document
      .querySelector(`.article-${curPage}`)
      .insertAdjacentHTML('beforeend', markup);
  }

  displayAll(data) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.displayMedicines(data.medicines, data.currentPage);
    this.displayOintments(data.ointments, data.currentPage);
  }

  // event handlers
  addHandlerLogo(handler) {
    document.querySelector('.header').addEventListener(
      'click',
      function (e) {
        console.log(e.target);

        // check if img or header is clicked
        const btn = e.target.closest('.header-logo') || e.target.closest('.h1');

        // exit if null
        if (!btn) return;

        // call refresh
        handler();
      }.bind(this)
    );
  }

  addHandlerMenu() {
    // menu button handler
    document.querySelector('.header').addEventListener(
      'click',
      function (e) {
        const btn =
          e.target.closest('.header-menu-button') ||
          e.target.closest('.header-close-button');

        // do nothing if btn is not clicked
        if (!btn) return;

        // open or close menu
        this.toggleMenu();
      }.bind(this)
    );
  }

  addHandlerMenuButtons(handler) {
    document.querySelector('.aside').addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.aside-li');
        if (!btn) return;

        console.log(btn.dataset.button);
        handler(btn.dataset.button);
      }.bind(this)
    );
  }
}

export default new View();
