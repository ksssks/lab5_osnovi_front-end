showMenu(1);

function showMenu(algorithmNumber) {
    document.querySelectorAll('.algorithm-section').forEach(function (section) {
        section.style.display = 'none';
    });

    document.getElementById('part' + algorithmNumber).style.display = 'block';

    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    document.querySelector('.btn:nth-child(' + algorithmNumber + ')').classList.add('active');
}

(function () {
    'use strict';

    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');

        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.getElementById("lastName").addEventListener("input", function () {
    let value = this.value;
    this.value = value.replace(/[^а-яА-ЯІі]/g, '')
        .replace(/^(.)/, (match, p1) => p1.toUpperCase());
});

document.getElementById("firstName").addEventListener("input", function () {
    let value = this.value;
    this.value = value.toUpperCase().replace(/[^А-ЯІі]/g, '');
    if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
    }
    if (this.value.length === 1) {
        this.value += '.';
    }
});

document.getElementById("fatherName").addEventListener("input", function () {
    let value = this.value;
    this.value = value.toUpperCase().replace(/[^А-ЯІі]/g, '');
    if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
    }
    if (this.value.length === 1) {
        this.value += '.';
    }
});

document.getElementById("group").addEventListener("input", function () {
    let value = this.value.toUpperCase();
    value = value.replace(/[^А-ЯІі0-9]/g, '');

    if (value.length > 5) {
        value = value.slice(0, 5);
    }

    if (value.length > 2) {
        value = value.slice(0, 2) + '-' + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0, 5);
    } else if (value.length > 3) {
        value = value.slice(0, 3) + value.slice(3).replace(/[^0-9]/g, '');
    }

    if (value.length > 2 && !/^[А-ЯІі]{2}/.test(value.slice(0, 2))) {
        value = value.slice(0, 2).replace(/[^А-Я]/g, '') + value.slice(2);
    }
    this.value = value;
});

document.getElementById("telephone").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 12) {
        value = value.slice(0, 12);
    }

    let formattedValue = '';
    if (value.length > 0) {
        formattedValue += '(' + value.slice(0, 3) + ')';
    }
    if (value.length > 3) {
        formattedValue += '-' + value.slice(3, 6);
    }
    if (value.length > 6) {
        formattedValue += '-' + value.slice(6, 8);
    }
    if (value.length > 8) {
        formattedValue += '-' + value.slice(8, 10);
    }

    this.value = formattedValue;
});

document.getElementById("id_card").addEventListener("input", function () {
    let value = this.value.toUpperCase();
    value = value.replace(/[^А-ЯІі0-9]/g, '');

    if (value.length > 9) {
        value = value.slice(0, 9);
    }

    if (value.length > 2) {
        value = value.slice(0, 2) + '№' + value.slice(2);
    }

    if (value.length > 9) {
        value = value.slice(0, 9);
    } else if (value.length > 3) {
        value = value.slice(0, 3) + value.slice(3).replace(/[^0-9]/g, '').slice(0, 6);
    }

    if (value.length > 2 && !/^[А-ЯІі]{2}/.test(value.slice(0, 2))) {
        value = value.slice(0, 2).replace(/[^А-Я]/g, '') + value.slice(2);
    }

    this.value = value;
});

document.getElementById("faculty").addEventListener("input", function () {
    let value = this.value.toUpperCase();
    value = value.replace(/[^А-ЯІі]/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    this.value = value;
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    const fieldsToValidate = [
        { id: 'lastName', minLength: 2, regex: null },
        { id: 'firstName', minLength: 2, regex: null },
        { id: 'fatherName', minLength: 2, regex: null },
        { id: 'group', minLength: 5, regex: /^[А-ЯІі]{2}-\d{2}$/ },
        { id: 'telephone', minLength: 12, regex: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/ },
        { id: 'id_card', minLength: 9, regex: /^[А-ЯІі]{2}№\d{6}$/ },
        { id: 'faculty', minLength: 4, regex: null },
    ];

    fieldsToValidate.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value;

        if (value.length < field.minLength || (field.regex && !field.regex.test(value))) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    if (isValid) {
        const fullName = `${document.getElementById('lastName').value} ${document.getElementById('firstName').value} ${document.getElementById('fatherName').value}`;
        document.getElementById('modalFullName').textContent = fullName;
        document.getElementById('modalGroup').textContent = document.getElementById('group').value;
        document.getElementById('modalTelephone').textContent = document.getElementById('telephone').value;
        document.getElementById('modalIdCard').textContent = document.getElementById('id_card').value;
        document.getElementById('modalFaculty').textContent = document.getElementById('faculty').value;

        $('#dataModal').modal('show');
    } else {
        alert('Заповніть усі поля повністю.');
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', function() {
    const cell = document.querySelector('.interactive_table tr:nth-child(7) td:nth-child(2)');
    const colorPicker = document.getElementById('colorPicker');
    let savedColor = '';

    if (!cell || !colorPicker) {
        console.error('Cell or colorPicker not found');
        return;
    }

    cell.addEventListener('mouseover', function() {
        if (!savedColor) {
            cell.style.backgroundColor = getRandomColor();
        }
    });

    cell.addEventListener('mouseout', function() {
        if (!savedColor) {
            cell.style.backgroundColor = '';
        }
    });

    cell.addEventListener('click', function() {
        savedColor = colorPicker.value;
        cell.style.backgroundColor = savedColor;
    });

    cell.addEventListener('dblclick', function() {
        const row = cell.parentNode;
        const cells = row.querySelectorAll('td');

        cells.forEach(c => {
            c.style.backgroundColor = savedColor;
        });
    });

    resetButton.addEventListener('click', function() {
        const cells = document.querySelectorAll('.interactive_table td');

        cells.forEach(c => {
            c.style.backgroundColor = '';
        });
    });

    colorPicker.addEventListener('change', function() {
        savedColor = colorPicker.value;
        cell.style.backgroundColor = savedColor;
    });
});
