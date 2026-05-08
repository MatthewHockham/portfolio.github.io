"""
This programme stores users' phone numbers
"""

#Import the libraries
import sqlite3
from tkinter import *
from tkinter import messagebox
import streamlit as st
import sys

#Create or connect to a database
conn = sqlite3.connect("phonelist.db")

#Create a cursor
cur = conn.cursor()

#Create table contact
cur.execute('''
CREATE TABLE IF NOT EXISTS contact(
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(100),
    phonenumber VARCHAR(20),
    address TEXT, 
    organization VARCHAR(100),
    notes TEXT, 
    mygroup VARCHAR(125), 
    age INTEGER(2),
    birthday DATE, 
    worknumber VARCHAR(20),
    pronouns VARCHAR(20), 
    nickname VARCHAR(10),
    website TEXT)
''')

#Commit query
conn.commit()

# Create GUI
tk = Tk()
tk.title('My Contacts')
tk.geometry("480x800")
tk.resizable(0,0) #Don't allow the screen to be resized

# Frame for 
rightFrame = Frame(tk, width=800)
rightFrame.pack(anchor="center", fill="both", expand=True)

def clearFrame(frame):
    for widget in frame.winfo_children():
        widget.destroy()        
        
# Menu Creation        
taskbar = Menu(tk)
filemenu = Menu(taskbar, tearoff=0, font='Helvetica 12')
filemenu.add_command(label="Home", command=lambda: mainMenu())
filemenu.add_command(label="Add New Contact", command=lambda: addContact(rightFrame))
filemenu.add_command(label="Find Contact", command=lambda: findContact(rightFrame))
filemenu.add_command(label="Quit", command=lambda: sys.exit())
taskbar.add_cascade(menu=filemenu, label="Menu")    
tk.config(menu=taskbar)  

def listAll(frame):
    clearFrame(frame)
    
    cur.execute('SELECT firstname, lastname FROM contact')
    contacts = cur.fetchall()
    
    contactFrame = Frame(rightFrame, bg="lightgray")
    contactFrame.pack(anchor="w", fill="none")
    
    Label(contactFrame, text="Contacts List", font='Helvetica 20 bold', bg="lightgray").pack(anchor="w", pady=7)
    
    if contacts:
        for contact in contacts:
            first_name, last_name = contact
            
            button = Button(contactFrame, text=f"{first_name} {last_name}",
                            command=lambda fn = first_name, ln = last_name: showContactDetails(fn, ln),
                            width=15, anchor="center", font='Helvetica 12 ')
            button.pack(side=TOP)
    else:
        Label(frame, text="Please Add a Contact!", bg="lightgray").pack(pady=20)
        
def editContact(firstname, lastname):
    clearFrame(rightFrame)
    
    cur.execute('SELECT * FROM contact WHERE firstname = ? AND lastname = ?', (firstname, lastname))
    contact = cur.fetchone()
    
    if contact:
        labels = [
            "First Name", "Last Name", "Email", "Phone Number", "Home Address",
            "Organization", "Notes", "Group", "Age", "Birthday",
            "Work Number", "Pronouns", "Nickname", "Website"
        ]
        
        entries = {}
        
        # Scroll bar frame
        canvas = Canvas(rightFrame)
        formFrame = Frame(canvas)
        scrollbar = Scrollbar(rightFrame, orient="vertical", command=canvas.yview)
        canvas.configure(yscrollcommand=scrollbar.set)
        
        scrollbar.pack(side=RIGHT, fill="y")
        canvas.pack(fill="both", expand=True)
        canvas.create_window((0, 0), window=formFrame, anchor="nw")
        
        for label, value in zip(labels, contact):
            frame3 = Frame(formFrame)
            frame3.pack(anchor="center", fill="x", pady=5)
            
            label_widget = Label(frame3, text=f"{label}:", anchor="w")
            label_widget.pack(side=LEFT, padx=5)
            
            entry = Entry(frame3, width=40)
            entry.insert(0, value)
            entry.pack(side=LEFT, padx=5)
            entries[label] = entry
            
        buttonFrame = Frame(formFrame)
        buttonFrame.pack(fill="x", pady=10)
            
        save_button = Button(buttonFrame, text="Save Changes", command=lambda: updateContact(firstname, lastname, entries))
        save_button.pack(side=LEFT, padx=5)
        
        discard_button = Button(buttonFrame, text="Discard Changes", command=lambda: discardChanges())
        discard_button.pack(side=LEFT, padx=5)
        
        back_button = Button(buttonFrame, text="Back to Contacts", command= mainMenu)
        back_button.pack(side=LEFT, padx=5)
        
        formFrame.update_idletasks() # Update frame's dimensions
        canvas.config(scrollregion=canvas.bbox('all'))
    else:
        Label(rightFrame, text="Contact not Found.", anchor="w").pack(padx=10)

def addContact(frame):
    clearFrame(frame)
    
    labels = [
        "First Name", "Last Name", "Email", "Phone Number", "Home Address",
        "Organisation", "Notes", "Group", "Age", "Birthday",
        "Work Number", "Pronouns", "Nickname", "Website"
    ]
    
    entries = {}
    
    # Scroll bar frame
    canvas = Canvas(rightFrame)
    formFrame = Frame(canvas)
    scrollbar = Scrollbar(frame, orient="vertical", command=canvas.yview)
    canvas.configure(yscrollcommand=scrollbar.set)
        
    scrollbar.pack(side=RIGHT, fill="y")
    canvas.pack(fill="both", expand=True)
    canvas.create_window((0, 0), window=formFrame, anchor="nw")
    
    for label in labels:
        frame2 = Frame(formFrame)
        frame2.pack(anchor="center", fill="x", pady=5)
        
        labelAdd = Label(frame2, text=f"{label}", anchor="w")
        labelAdd.pack(side=LEFT, padx=5)
        
        entry = Entry(frame2, width=40)
        entry.pack(side=LEFT, padx=5)
        entries[label] = entry
    
    buttonFrame = Frame(formFrame)
    buttonFrame.pack(fill="x", pady=10)
    
    add_contact = Button(buttonFrame, text="Add Contact", command=lambda: addContactProcess(entries),font= 'Helvetica 10')
    add_contact.pack(side=LEFT,padx=5)
    
    back_button = Button(buttonFrame, text="Back to Contacts", command=mainMenu, font= 'Helvetica 10')
    back_button.pack(side=LEFT, padx=5)
    
    formFrame.update_idletasks()
    canvas.config(scrollregion=canvas.bbox("all"))
    
def findContact(frame):
    clearFrame(frame)
    
    label = Label(frame, text="Enter a phone number to find: ")
    label.pack()
    phone = Entry(frame)
    phone.pack()
        
    confirm = Button(frame, text="Find", command=lambda: findContactProcess(phone))
    confirm.pack()
        
def addContactProcess(entries):
    phone_number = entries["Phone Number"].get()
    
    cur.execute("SELECT * FROM contact WHERE phonenumber = ?", (phone_number,))
    existingContact = cur.fetchone()
    
    if existingContact:
        overwrite = messagebox.askyesno(
            "Duplicate Phone Number",
            "A contact with this phone number already exists. Do you want to overwrite it?"
        )
        if not overwrite:
            print("Contact addition cancelled.")
            return
        else:
            cur.execute("DELETE FROM contact WHERE phonenumber = ?", (phone_number,))
    
    values = [entries[label].get() for label in entries]
    cur.execute("INSERT INTO contact VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values)
    conn.commit()
    print("\n(%s, %s) has been added to the phonebook!\n" %(values[0]),values[1])
    mainMenu()
    
def findContactProcess(phone_entry):
    phone = phone_entry.get()
    cur.execute(' SELECT * FROM contact WHERE phonenumber = ?', (phone,))
    find = cur.fetchone()
    
    clearFrame(rightFrame)
    
    if find:
        labels = [
            "First Name", "Last Name", "Email", "Phone Number", "Home Address",
            "Organization", "Notes", "Group", "Age", "Birthday",
            "Work Number", "Pronouns", "Nickname", "Website"
        ]
        
        for label, value in zip(labels, find):
            Label(rightFrame, text=f"{label}: {value}").pack()
    else:
        Label(rightFrame, text="No contact found.").pack()
        
    back_button = Button(rightFrame, text="Back to Contacts", command=mainMenu)
    back_button.pack()
        
def showContactDetails(firstname, lastname):
    clearFrame(rightFrame)
    
    cur.execute('SELECT * FROM contact WHERE firstname = ? AND lastname = ?', (firstname, lastname))
    contact = cur.fetchone()
    
    if contact:
        labels = [
            "First Name", "Last Name", "Email", "Phone Number", "Home Address",
            "Organization", "Notes", "Group", "Age", "Birthday",
            "Work Number", "Pronouns", "Nickname", "Website"
        ]
        
        contactFrame = Frame(rightFrame)
        contactFrame.pack(anchor="center", padx=150, fill="none")
        
        title = Label(contactFrame, text="Contacts List", font='Helvetica 12 bold', bg="lightgray")
        title.pack(anchor="center", pady=10)
        
        for label, value in zip(labels, contact):
            Label(contactFrame, text=f"{label}: {value}").pack(anchor="w", padx=10, pady=2)
            
        buttonFrame = Frame(contactFrame)
        buttonFrame.pack(fill="y")
            
        del_button = Button(buttonFrame, text="Delete Contact", command=lambda: delContact(firstname, lastname))
        del_button.pack(side=LEFT, padx=5)
        
        edit_button = Button(buttonFrame, text="Edit", command=lambda fn=firstname, ln=lastname: editContact(fn, ln))
        edit_button.pack(side=RIGHT, padx=5)
        
        back_button = Button(buttonFrame, text="Back to Contacts", command=mainMenu)
        back_button.pack(side=LEFT)
    else:
        Label(rightFrame, text="Contact not found.", anchor="w").pack() 
        Button(rightFrame, text="Back to Contacts", command = lambda: mainMenu()).pack()  
    
def updateContact(old_firstname, old_lastname, entries):
    new_values = [entries[label].get() for label in entries]
    parameters = new_values + [old_firstname, old_lastname]
    
    cur.execute(''' UPDATE contact SET firstname = ?, lastname = ?, email = ?, phonenumber = ?,
                address = ?, organization = ?, notes = ?, mygroup = ?, age = ?,
                birthday = ?, worknumber = ?, pronouns = ?, nickname = ?, website = ?
                WHERE firstname = ? AND lastname = ?
                ''', parameters)
    
    conn.commit()
    print("\nContact updated successfully!\n")
    mainMenu()
    
def delContact(firstname, lastname):
    if messagebox.askyesno("Delete contact", f"Are you sure you want to delete {firstname} {lastname}?"):
        cur.execute('DELETE FROM contact WHERE firstname = ? AND lastname = ?', (firstname, lastname))
        conn.commit()
        print(f"\n{firstname} {lastname} has been deleted from the phonebook!\n")
        mainMenu()
    else: 
        print("\nDeletion Cancelled.\n")
        
def discardChanges():
    if messagebox.askyesno("Discard Changes", "Are you sure you want to discard all changes?"):
        print("Changes discarded.")
        mainMenu()
    
def mainMenu():
    clearFrame(rightFrame)
    
    Label(rightFrame, text="Contacts List", font='Helvetica 12 bold', bg="lightgray").pack(pady=10)
    listAll(rightFrame)

# Close button
closeButton = Button(tk, text="Close", command=tk.quit)
closeButton.pack(side=BOTTOM, pady=10)  

mainMenu()
tk.mainloop()