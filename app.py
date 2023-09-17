import pickle
import tempfile
import time
import warnings
from flask import Flask, render_template, request, redirect, url_for, flash, session, Response, jsonify, send_file, \
    make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    school_name = db.Column(db.String(120), nullable=False)

    def _init_(self, email, password, address, phone_number, school_name):
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        self.address = address
        self.phone_number = phone_number
        self.school_name = school_name


with app.app_context():
    db.create_all()


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email'].strip()
        password = request.form['password'].strip()

        user = User.query.filter((User.email == email)).first()

        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash('Login successful!', 'success')
            return redirect(url_for('first_page'))
        else:
            flash('Invalid username/email or password. Please try again.', 'error')

    return render_template('frontpage.html')


@app.route('/')
def start():
    return render_template('frontpage.html')
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/login')
def log():
    return redirect('/login')
# def start():
#     return redirect('/login')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email'].strip()
        password = request.form['password'].strip()
        address = request.form['address'].strip()
        phone_number = request.form['phone_number'].strip()
        school_name = request.form['school_name'].strip()

        existing_user = User.query.filter((User.email == email)).first()

        if existing_user:
            flash('Email already exists. Please choose a different one.', 'error')
        else:
            # Use app.app_context() here to access the database within the context
            with app.app_context():
                new_user = User(email=email, password=password, address=address, phone_number=phone_number,
                                school_name=school_name)
                db.session.add(new_user)
                db.session.commit()
            flash('Account created successfully. Please log in.', 'success')
            return redirect(url_for('login'))

    return render_template('signup.html')


@app.route('/first_page')
def first_page():
    if 'user_id' in session:
        return render_template('firstpage.html')
    else:
        flash('Please log in to access the first page.', 'error')
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
