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
      minimumFractionDigits: 2,
    }).format(amount);
  }

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

  displayMedicines(medicines) {
    console.log('displayMedicines');
    let sum = 0;
    let markup = '';

    if (medicines === undefined) {
      console.log('medicines === undefined');
      // if no medicines, show message
      markup += `<h3 class="article-h3">No medicine on file</h3>`;
    } else {
      console.log('medicines !== undefined');
      // if medicines is not empty
      markup += `
      <table class="article-table">
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
          <td class="article-table-data">${el.quantity}</td>
          <td class="article-table-data">${el.sellingPrice}</td>
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

    // insert table to html
    document
      .querySelector('.article-view-all')
      .insertAdjacentHTML('beforeend', markup);
  }

  displayOintments(ointments) {
    console.log('displayOintments');
    let markup = '';
    // if no ointments. display message.
    if (ointments === undefined) {
      console.log('ointments === undefined');
      markup += `<h3 class="article-h3">No ointment on file</h3>`;
    } else {
      console.log('ointments !== undefined');
      // if ointment is not empty

      // ointment table headers
      markup += `
      <table class="article-table">
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
      .querySelector('.article-view-all')
      .insertAdjacentHTML('beforeend', markup);
  }

  displayAll(data) {
    console.log('displayAll');
    this.displayMedicines(data.medicines);
    this.displayOintments(data.ointments);
  }
}

export default new View();
