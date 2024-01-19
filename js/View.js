import * as util from './util.js';

class View {
  menuBtn = document.querySelector('.button-menu');
  aside = document.querySelector('.aside');

  toggleMenu() {
    this.menuBtn.classList.toggle('open');
    this.aside.classList.toggle('hidden');
  }

  showViewAll() {
    // scroll to top
    window.scrollTo(0, 0);

    const current = document.querySelector('.current');
    let section = document.querySelector(`.section-view-all`);

    // switch section
    current.classList.remove('current');
    current.classList.add('hidden');
    section.classList.add('current');
    section.classList.remove('hidden');
  }

  resetAddStock() {
    document.querySelector('.select-add-stock-name').selectedIndex = 0;
    document.querySelector('#input-add-stock-quantity').value = '';
  }

  resetEditPrice() {
    document.querySelector('.select-edit-price-name').selectedIndex = 0;
    document.querySelector('#input-edit-price-quantity').value = '';
  }

  resetSellMedicine() {
    document.querySelector('.select-sell-medicine-name').selectedIndex = 0;
    document.querySelector('#input-sell-medicine-quantity').value = '';
  }

  resetNewMedicine() {
    document.querySelector('#input-new-medicine-name').value = '';
    document.querySelector('#input-new-medicine-unitPrice').value = '';
    document.querySelector('#input-new-medicine-quantity').value = '';
    document.querySelector('#input-new-medicine-sellingPrice').value = '';
    document.querySelector('#input-new-medicine-total').value = '';
  }

  resetDeleteMedicine() {
    document.querySelector('.select-delete-medicine-name').selectedIndex = 0;
  }

  resetFile() {
    document.querySelector('input[type="file"]').value = '';
  }

  menuClick(handler, e) {
    // check if button was pressed
    const btn = e.target.closest('.button');
    if (!btn) return;

    // scroll to top
    window.scrollTo(0, 0);

    const current = document.querySelector('.current');
    let section = document.querySelector(`.section-${btn.dataset.button}`);

    if (btn.dataset.button === 'save-backup') {
      handler(btn.dataset.button);
      section = document.querySelector(`.section-view-all`);
    }
    if (btn.dataset.button === 'load-backup') {
      handler(btn.dataset.button);
      section = document.querySelector(`.section-view-all`);
    }

    // switch section
    current.classList.remove('current');
    current.classList.add('hidden');
    section.classList.add('current');
    section.classList.remove('hidden');

    // toggle menu after switching
    this.toggleMenu();
  }

  fileChanged(handler, e) {
    handler(document.querySelector('input[type="file"]').files);
    this.toggleMenu();
  }

  actionButton(handler, e) {
    if (e.target.closest('button') === undefined) return;
    if (e.target.closest('button') === '') return;
    if (e.target.closest('button') === null) return;

    let n, data;

    switch (e.target.closest('button')) {
      case document.querySelector('.button-add-stock'):
        n = 'add-stock';
        data = {
          index: document.querySelector('.select-add-stock-name').value,
          quantity: Number(
            document.querySelector('#input-add-stock-quantity').value
          ),
        };
        handler(n, data);
        break;
      case document.querySelector('.button-edit-price'):
        n = 'edit-price';
        data = {
          index: document.querySelector('.select-edit-price-name').value,
          newPrice: Number(
            document.querySelector('#input-edit-price-new').value
          ),
        };
        handler(n, data);
        break;
      case document.querySelector('.button-sell-medicine'):
        n = 'sell-medicine';
        data = {
          index: document.querySelector('.select-sell-medicine-name').value,
          quantity: Number(
            document.querySelector('#input-sell-medicine-quantity').value
          ),
        };
        handler(n, data);
        break;
      case document.querySelector('.button-new-medicine'):
        n = 'new-medicine';
        data = {
          name: document.querySelector('#input-new-medicine-name').value,
          unitPrice: Number(
            document.querySelector('#input-new-medicine-unitPrice').value
          ),
          quantity: Number(
            document.querySelector('#input-new-medicine-quantity').value
          ),
          sellingPrice: Number(
            document.querySelector('#input-new-medicine-sellingPrice').value
          ),
          total:
            Number(
              document.querySelector('#input-new-medicine-quantity').value
            ) *
            Number(
              document.querySelector('#input-new-medicine-sellingPrice').value
            ),
        };
        handler(n, data);
        break;
      case document.querySelector('.button-delete-medicine'):
        n = 'delete-medicine';
        data = {
          index: document.querySelector('.select-delete-medicine-name').value,
        };
        handler(n, data);
        break;
    }
  }

  loadInput(data, e) {
    const select = e.target.classList.value;
    if (select === '') return;

    switch (select) {
      case 'select-add-stock-name':
        document.querySelector('#input-add-stock-quantity-current').value =
          data.Medicines[
            document.querySelector('.select-add-stock-name').value
          ].quantity;
        break;
      case 'select-edit-price-name':
        document.querySelector('#input-edit-price-unitPrice-current').value =
          data.Medicines[
            document.querySelector('.select-edit-price-name').value
          ].unitPrice;
        document.querySelector('#input-edit-price-unitPrice-new').value =
          document.querySelector('#input-edit-price-unitPrice-current').value;
        document.querySelector('#input-edit-price-sellingPrice-current').value =
          data.Medicines[
            document.querySelector('.select-edit-price-name').value
          ].sellingPrice;
        document.querySelector('#input-edit-price-sellingPrice-new').value =
          document.querySelector(
            '#input-edit-price-sellingPrice-current'
          ).value;
        break;
      case 'select-sell-medicine-name':
        document.querySelector('#input-sell-medicine-stock-left').value =
          data.Medicines[
            document.querySelector('.select-sell-medicine-name').value
          ].quantity;
        document.querySelector('#input-sell-medicine-sellingPrice').value =
          data.Medicines[
            document.querySelector('.select-sell-medicine-name').value
          ].sellingPrice;
        break;
      case 'select-delete-medicine-name':
        break;
    }
  }

  typeInput(data, e) {
    const select = e.target.id;
    switch (select) {
      case 'input-add-stock-quantity':
        document.querySelector('#input-add-stock-total').value =
          Number(document.querySelector('#input-add-stock-quantity').value) +
          Number(
            document.querySelector('#input-add-stock-quantity-current').value
          );
        break;
      case 'input-edit-price-new':
        break;
      case 'input-sell-medicine-quantity':
        // get sellingPrice from data
        const sellMedPrice =
          data.Medicines[
            document.querySelector('.select-sell-medicine-name').value
          ].sellingPrice;
        const sellMedQuantity = Number(
          document.querySelector('#input-sell-medicine-quantity').value
        );

        // compute total
        document.querySelector('#input-sell-medicine-total').value =
          sellMedPrice * sellMedQuantity;
        break;
      case 'input-new-medicine-quantity':
      case 'input-new-medicine-sellingPrice':
        const newMedQuantity = Number(
          document.querySelector('#input-new-medicine-quantity').value
        );
        const newMedSellPrice = Number(
          document.querySelector('#input-new-medicine-sellingPrice').value
        );

        // compute total
        document.querySelector('#input-new-medicine-total').value =
          newMedQuantity * newMedSellPrice;
        break;
    }
  }

  addHandlerToggleMenu() {
    this.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
  }

  addHandlerMenuButtons(handler) {
    this.aside.addEventListener('click', this.menuClick.bind(this, handler));
  }

  addHandlerFileChange(handler) {
    document
      .querySelector('input[type="file"]')
      .addEventListener('change', this.fileChanged.bind(this, handler));
  }

  addHandlerSectionButtons(handler) {
    document
      .querySelector('.main')
      .addEventListener('click', this.actionButton.bind(this, handler));
  }

  addHandlerSectionLoadData(data) {
    document
      .querySelector('.main')
      .addEventListener('change', this.loadInput.bind(this, data));
  }

  addHandlerSectionInput(data) {
    document
      .querySelector('.main')
      .addEventListener('input', this.typeInput.bind(this, data));
  }

  //update and render sections
  renderMedicineTable(meds) {
    let markup = '';

    // check if data is not empty
    if (meds.length === 0) {
      // display no data message
      markup += `<span class="error-message">There are no medicines on file.</span>`;
    } else {
      // generate medicines table
      markup += `<table class="section-table">
    <thead>
      <tr class="section-table-row">
        <th class="section-table-data">Medicine</th>
        <th class="section-table-data">Qty.</th>
        <th class="section-table-data">Price</th>
        <th class="section-table-data">Total</th>
      </tr>
    </thead>
    <tbody>`;

      let total = 0;
      meds.forEach((el) => {
        markup += `
      <tr class="section-table-row ${
        el.quantity < 5 ? 'section-table-row-low-stock' : ''
      }">
        <td class="section-table-data">${el.name}</td>
        <td class="section-table-data">${util.formatNumbers(el.quantity)}</td>
        <td class="section-table-data">${util.formatNumbers(
          el.sellingPrice
        )}</td>
        <td class="section-table-data">${util.formatNumbers(el.total)}</td>
      </tr>`;
        total += el.total;
      });
      markup += `
    </tbody>
  </table>
  <h3 class="section-h3">Total = ${util.formatCurrency(total)}</h3>`;
      // end of medicines table
    }
    return markup;
  }

  renderOintmentTable(oints) {
    let markup = '';

    // check if data is not empty
    if (oints.length === 0) {
      // display no data message
      markup += `<span class="error-message">There are no ointments on file.</span>`;
    } else {
      // display no data message

      markup += `<table class="section-table">
    <thead>
      <tr class="section-table-row">
        <th class="section-table-data">Ointments</th>
        <th class="section-table-data">Amount</th>
      </tr>
    </thead>
    <tbody>`;

      oints.forEach((el) => {
        markup += `
      <tr class="section-table-row ${
        el.amount < 1 && el.less ? 'section-table-row-low-stock' : ''
      }">
        <td class="section-table-data">${el.name}</td>
        <td class="section-table-data">${el.less ? 'Less ' : ''}${el.amount} ${
          el.unit
        }</td>
      </tr>`;
      });
      markup += `
    </tbody>
  </table>`;
    }

    return markup;
  }

  renderReportTable(solds) {
    let markup = '';

    const sevenDays = 604800000;
    const weekArray = [];
    solds.forEach((el) => {
      if (el.dateSold + sevenDays > Date.now()) weekArray.push(el);
    });

    // check if data is not empty
    if (weekArray.length === 0) {
      // display no data message
      markup += `<span class="error-message">There are no sold medicine on file.</span>`;
    } else {
      // display no data message

      markup += `<table class="section-table">
    <thead>
      <tr class="section-table-row">
      <th class="section-table-data">Medicine Sold</th>
      <th class="section-table-data">Date Sold</th>
      <th class="section-table-data">Unit Price</th>
      <th class="section-table-data">Quantity</th>
      <th class="section-table-data">Selling Price</th>
      <th class="section-table-data">Total</th>
      <th class="section-table-data">Profit</th>
      </tr>
    </thead>
    <tbody>`;

      let medicineTotal = 0;
      let profitTotal = 0;
      weekArray.forEach((el) => {
        markup += `
      <tr class="section-table-row">
        <td class="section-table-data">${el.name}</td>
        <td class="section-table-data">${new Date(
          el.dateSold
        ).toLocaleDateString('en-US')}</td>
        <td class="section-table-data">${util.formatNumbers(el.unitPrice)}</td>
        <td class="section-table-data">${util.formatNumbers(el.quantity)}</td>
        <td class="section-table-data">${util.formatNumbers(
          el.sellingPrice
        )}</td>
        <td class="section-table-data">${util.formatNumbers(
          el.quantity * el.sellingPrice
        )}</td>
        <td class="section-table-data">${util.formatNumbers(
          (el.sellingPrice - el.unitPrice) * el.quantity
        )}</td>
      </tr>`;

        medicineTotal += el.sellingPrice * el.quantity;
        profitTotal += (el.sellingPrice - el.unitPrice) * el.quantity;
      });

      markup += `
    </tbody>
  </table>
  <h3 class="section-h3">Weekly Medicine Total = ${util.formatCurrency(
    medicineTotal
  )}</h3>
  <h3 class="section-h3">Weekly Profit Total = ${util.formatCurrency(
    profitTotal
  )}</h3>`;
    }

    return markup;
  }

  renderViewAll(data) {
    // clear template
    document.querySelector('.section-view-all').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">View all</h2>`;

    markup += this.renderMedicineTable(data.Medicines);
    markup += this.renderOintmentTable(data.Ointments);

    // insert markup
    document
      .querySelector('.section-view-all')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderViewMedicine(data) {
    // clear template
    document.querySelector('.section-view-medicine').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">View Medicines</h2>`;

    markup += this.renderMedicineTable(data.Medicines);

    // insert markup
    document
      .querySelector('.section-view-medicine')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderViewOintment(data) {
    // clear template
    document.querySelector('.section-view-ointment').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">View Ointments/Creams</h2>`;

    markup += this.renderOintmentTable(data.Ointments);

    // insert markup
    document
      .querySelector('.section-view-ointment')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderWeeklyReport(data) {
    // clear template
    document.querySelector('.section-weekly-report').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">Weekly Report</h2>`;

    markup += this.renderReportTable(data.Sold);

    // insert markup
    document
      .querySelector('.section-weekly-report')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderAddStock(data) {
    // clear template
    document.querySelector('.section-add-stock').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">Add Stocks</h2>`;

    if (data.Medicines.length > 0) {
      markup += `<select class="select-add-stock-name">
      <option>Choose medicine:</option>`;

      data.Medicines.forEach((el, i) => {
        markup += `<option value="${i}">${el.name}</option>`;
      });

      markup += `</select>
      <label for="input-add-stock-quantity-current">Current Stock:</label>
      <input type="number" id="input-add-stock-quantity-current" placeholder="0" readonly />
      <label for="input-add-stock-quantity">Quantity:</label>
      <input type="number" id="input-add-stock-quantity" placeholder="0" />
      <label for="input-add-stock-total">Total</label>
      <input
        type="number"
        id="input-add-stock-total"
        placeholder="0"
        readonly
      />
      <button class="button-add-stock button">Add</button>`;
    } else {
      // no medicine to add
      markup += `<span class="error-message">No existing medicine on hand.</span>`;
    }

    // insert markup
    document
      .querySelector('.section-add-stock')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderEditPrice(data) {
    // clear template
    document.querySelector('.section-edit-price').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">Edit Price</h2>`;

    if (data.Medicines.length > 0) {
      markup += `<select class="select-edit-price-name">
      <option>Choose medicine:</option>`;

      data.Medicines.forEach((el, i) => {
        markup += `<option value="${i}">${el.name}</option>`;
      });

      markup += `</select>
      <label for="input-edit-price-unitPrice-current"
        >Current Unit Price</label
      >
      <input
        type="number"
        id="input-edit-price-unitPrice-current"
        value="0"
        readonly
      />
      <label for="input-edit-price-unitPrice-new">New Unit Price</label>
      <input
        type="number"
        id="input-edit-price-unitPrice-new"
        placeholder="0"
      />
      <label for="input-edit-price-sellingPrice-current"
        >Current Selling Price</label
      >
      <input
        type="number"
        id="input-edit-price-sellingPrice-current"
        value="0"
        readonly
      />
      <label for="input-edit-price-sellingPrice-new">New Selling Price</label>
      <input
        type="number"
        id="input-edit-price-sellingPrice-new"
        placeholder="0"
      />
      <button class="button-edit-price button">Edit</button>`;
    } else {
      // no medicine to add
      markup += `<span class="error-message">No existing medicine on hand.</span>`;
    }

    // insert markup
    document
      .querySelector('.section-edit-price')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderSellMedicine(data) {
    // clear template
    document.querySelector('.section-sell-medicine').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">Sell Medicine</h2>`;

    if (data.Medicines.length > 0) {
      markup += `<select class="select-sell-medicine-name">
      <option>Choose medicine:</option>`;

      data.Medicines.forEach((el, i) => {
        markup += `<option value="${i}">${el.name}</option>`;
      });

      markup += `</select>
      <label for="input-sell-medicine-stock-left">Stocks Left</label>
      <input
        type="number"
        id="input-sell-medicine-stock-left"
        placeholder="0"
        readonly
      />
      <label for="input-sell-medicine-quantity">Quantity</label>
      <input
        type="number"
        id="input-sell-medicine-quantity"
        placeholder="0"
      />
      <label for="input-sell-medicine-sellingPrice">Price</label>
      <input
        type="number"
        id="input-sell-medicine-sellingPrice"
        placeholder="0"
        readonly
      />
      <label for="input-sell-medicine-total">Total</label>
      <input
        type="number"
        id="input-sell-medicine-total"
        value="0"
        readonly
      />
      <button class="button-sell-medicine button">Confirm</button>`;
    } else {
      // no medicine to add
      markup += `<span class="error-message">No existing medicine on hand.</span>`;
    }

    // insert markup
    document
      .querySelector('.section-sell-medicine')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderDeleteMedicine(data) {
    // clear template
    document.querySelector('.section-delete-medicine').innerHTML = '';

    // create markup
    let markup = `<h2 class="section-h2">Delete Medicine</h2>`;

    if (data.Medicines.length > 0) {
      markup += `<select class="select-delete-medicine-name">
      <option>Choose medicine:</option>`;

      data.Medicines.forEach((el, i) => {
        markup += `<option value="${i}">${el.name}</option>`;
      });

      markup += `</select>
      <button class="button-delete-medicine button">Delete</button>`;
    } else {
      // no medicine to add
      markup += `<span class="error-message">No existing medicine on hand.</span>`;
    }

    // insert markup
    document
      .querySelector('.section-delete-medicine')
      .insertAdjacentHTML('beforeend', markup);
  }

  //   toggleMenu() {
  //     document.querySelector('.header-menu-button').classList.toggle('active');
  //     document.querySelector('.header-close-button').classList.toggle('active');
  //     document.querySelector('.aside').classList.toggle('aside-open');
  //   }
  //   getFile() {
  //     return document.querySelector('input[type="file"]').files;
  //   }
  //   switchArticle(newPage, currentPage) {
  //     const curArticle = document.querySelector(`.article-${currentPage}`);
  //     const newArticle = document.querySelector(`.article-${newPage}`);
  //     if (curArticle !== newArticle) {
  //       curArticle.classList.add('hidden');
  //       newArticle.classList.remove('hidden');
  //     }
  //   }
  //   closeModal(curModal) {
  //     document.querySelector(`.modal-${curModal}`).classList.add('hidden');
  //   }
  //   openModal(modalPage, data) {
  //     const modal = `.modal-${modalPage}`;
  //     // open modal
  //     document.querySelector(modal).classList.remove('hidden');
  //     // clear existing options if any
  //     document.querySelector('#input-add-stock-name').innerHTML = '';
  //     // create markup for medicine list
  //     let markup = '<option>Choose stock to add</option>';
  //     data.forEach((el, i) => {
  //       markup += `<option value='${i}'>${el.name}</option>`;
  //     });
  //     // insert markup to html
  //     document
  //       .querySelector('#input-add-stock-name')
  //       .insertAdjacentHTML('beforeend', markup);
  //   }
  //   displayMedicines(medicines, curPage) {
  //     // clear existing data
  //     if (document.querySelector('.article-h3-medicines'))
  //       document.querySelector('.article-h3-medicines').remove();
  //     if (document.querySelector('.article-table-medicines'))
  //       document.querySelector('.article-table-medicines').remove();
  //     if (document.querySelector('.article-h4'))
  //       document.querySelector('.article-h4').remove();
  //     let sum = 0;
  //     let markup = '';
  //     if (medicines === undefined || medicines.length === 0) {
  //       // if no medicines, show message
  //       markup += `<h3 class="article-h3 article-h3-medicines">No medicine on file</h3>`;
  //     } else {
  //       // if medicines is not empty
  //       markup += `
  //       <table class="article-table article-table-medicines">
  //         <thead>
  //           <tr class="article-table-row">
  //             <th class="article-table-data">Medicine</th>
  //             <th class="article-table-data">Qty</th>
  //             <th class="article-table-data">Price</th>
  //             <th class="article-table-data">Total</th>
  //           </tr>
  //         </thead>
  //       <tbody>`;
  //       // loop every item of medicines
  //       medicines.forEach((el) => {
  //         markup += `
  //         <tr class="article-table-row ${
  //           el.quantity === 0 ? 'article-table-low-stock' : ''
  //         }">
  //           <td class="article-table-data">${el.name}</td>
  //           <td class="article-table-data">${util.formatNumbers(el.quantity)}</td>
  //           <td class="article-table-data">${util.formatNumbers(
  //             el.sellingPrice
  //           )}</td>
  //           <td class="article-table-data">${util.formatNumbers(el.total)}</td>
  //         </tr>`;
  //         sum += el.total;
  //       });
  //       // display total at end of table
  //       markup += `
  //         </tbody>
  //       </table>
  //       <h4 class="article-h4">Total = ${util.formatCurrency(sum)}</h4>`;
  //     }
  //     // insert table to html
  //     document
  //       .querySelector(`.article-${curPage}`)
  //       .insertAdjacentHTML('beforeend', markup);
  //   }
  //   displayOintments(ointments, curPage) {
  //     // clear existing data
  //     if (document.querySelector('.article-h3-ointment'))
  //       document.querySelector('.article-h3-ointment').remove();
  //     if (document.querySelector('.article-table-ointments'))
  //       document.querySelector('.article-table-ointments').remove();
  //     let markup = '';
  //     // if no ointments. display message.
  //     if (ointments === undefined || ointments.length === 0) {
  //       markup += `<h3 class="article-h3 article-h3-ointment">No ointment on file</h3>`;
  //     } else {
  //       // if ointment is not empty
  //       // ointment table headers
  //       markup += `
  //       <table class="article-table article-table-ointments">
  //         <thead>
  //           <tr class="article-table-row">
  //           <th class="article-table-data">Ointment</th>
  //           <th class="article-table-data">Qty</th>
  //           </tr>
  //         </thead>
  //         <tbody>`;
  //       // loop every ointment element
  //       ointments.forEach((el) => {
  //         markup += `
  //         <tr class="article-table-row ${
  //           el.amount <= 0.5 && el.less ? 'article-table-low-stock' : ''
  //         }">
  //           <td class="article-table-data">${el.name}</td>
  //           <td class="article-table-data">${el.less ? 'Less' : ''} ${
  //           el.amount
  //         } ${el.unit}</td>
  //         </tr>`;
  //       });
  //       // close table markup
  //       markup += `
  //         </tbody>
  //       </table>`;
  //     }
  //     // insert markup to html
  //     document
  //       .querySelector(`.article-${curPage}`)
  //       .insertAdjacentHTML('beforeend', markup);
  //   }
  //   displayAll(data) {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //     this.displayMedicines(data.Medicines, data.currentPage);
  //     this.displayOintments(data.Ointments, data.currentPage);
  //   }
  //   // event handlers
  //   addHandlerLogo(handler) {
  //     document.querySelector('.header').addEventListener(
  //       'click',
  //       function (e) {
  //         console.log(e.target);
  //         // check if img or header is clicked
  //         const btn = e.target.closest('.header-logo') || e.target.closest('.h1');
  //         // exit if null
  //         if (!btn) return;
  //         // call refresh
  //         handler();
  //       }.bind(this)
  //     );
  //   }
  //   addHandlerMenu() {
  //     // menu button handler
  //     document.querySelector('.header').addEventListener(
  //       'click',
  //       function (e) {
  //         const btn =
  //           e.target.closest('.header-menu-button') ||
  //           e.target.closest('.header-close-button');
  //         // do nothing if btn is not clicked
  //         if (!btn) return;
  //         // open or close menu
  //         this.toggleMenu();
  //       }.bind(this)
  //     );
  //   }
  //   addHandlerMenuButtons(handler) {
  //     document.querySelector('input[type="file"]').addEventListener(
  //       'change',
  //       function (e) {
  //         const btn = e.target.closest('.aside-li');
  //         if (!btn) return;
  //         handler(btn.dataset.button);
  //         if (btn.querySelector('input[type="file"'))
  //           document.querySelector('input[type="file"').value = '';
  //       }.bind(this)
  //     );
  //     document.querySelector('.aside').addEventListener(
  //       'click',
  //       function (e) {
  //         const btn = e.target.closest('.aside-li');
  //         if (!btn) return;
  //         if (btn.dataset.button === 'Load Backup') return;
  //         handler(btn.dataset.button);
  //       }.bind(this)
  //     );
  //   }
}

export default new View();
