import os
from pathlib import Path

cwd = Path.cwd()

comp_name = input('Enter React Component Name: ')
comp_type = input("Enter The Component's HTML Type: ")

react_template = f'''import {{styled}} from 'styled-components';

export default function {comp_name}() {{
  return (
     <Styled{comp_name}></Styled{comp_name}>
  );
}}

const Styled{comp_name} = styled.{comp_type}``
'''


if len(comp_name) == 0:
    print('You must specify a component name. Pascal Case is recommended for React components.')
    exit

if comp_name == 0:
    print('You must specify a component name. Pascal Case is recommended for React components.')
    exit

def is_Capitalized(str):
    if not str or not str[0].isupper():
        print('React component MUST start with a capital')
is_Capitalized(comp_name)

Path(comp_name).mkdir() # make new dir
os.chdir(comp_name) # change to new dir
with open(comp_name + '.jsx', 'w') as file: #create and write to file
    file.write(react_template)
    print(f"React component '{comp_name}' created and writted to the file: '{comp_name}.jsx'")


# run: python newReactComponent.py