import csv


class DrawReactionHTML:
    def __init__(self, reaction_data):
        self.reaction_data = reaction_data

        self.isNewReaction = False
        self.reagents = []
        self.products = []
        self.isNew = False 
        self.isProduct = False
        self.isReagent = True 
        self.html_string = ""
        
        self.header_html ='''
        <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mtable>
        '''
        
    def run(self):
        self.append_string_to_html(f'{self.header_html}\n')
        self.append_string_to_html('<mtr>\n')
        self.append_string_to_html('<mtd>\n')
        
        for coef, formula in self.reaction_data:   
            formula_formated = self.convert_str(formula)
            coef = self.transform_value(coef)
                        
            if self.products and '-' in coef:
                isNew = False 
                r = '<mn>+</mn>'.join(self.reagents)
                p = '<mn>+</mn>'.join(self.products)
                
                self.append_string_to_html(f'{r}\n')
                self.append_string_to_html('<mo>&#x2192;</mo>\n')
                self.append_string_to_html(f'{p}\n')
                self.append_string_to_html('</mtd>\n')
                self.append_string_to_html('</mtr>\n')

                self.append_string_to_html('<mtr>\n')
                self.append_string_to_html('<mtd>\n')
                #reaction = f'{r} → {p}'            
                #self.append_string_to_html(f'{reaction} \n')
                self.reagents.clear()
                self.products.clear()
                
            if '-' in coef:
                coef = coef.lstrip('-') if coef.lstrip('-') != '1' else '' 
                coef = f'<mn>{coef}</mn>' if coef else ''
                compound = f'{coef} {formula_formated}' 
                self.reagents.append(compound)
                continue
            
            coef = coef if coef != '1' else ''
            coef = f'<mn>{coef}</mn>' if coef else ''
            compound = f'{coef}{formula_formated}' 
            self.products.append(compound)

        

        r = '<mn>+</mn>'.join(self.reagents)
        p = '<mn>+</mn>'.join(self.products)
        #reaction = f'{r} -> {p}'
        #self.append_string_to_html(f'{reaction}\n ')
        self.append_string_to_html(f'{r}\n')
        self.append_string_to_html('<mo>&#x2192;</mo>\n')
        self.append_string_to_html(f'{p}\n')
        
        self.append_string_to_html('</mtd>\n')
        self.append_string_to_html('</mtr>\n')
    
        bottom = '''
        </mtable>
        </math>
        '''
        self.append_string_to_html(bottom)
        
        return self.html_string

    def append_string_to_html(self, s):
        self.html_string += s 
        
    def convert_str(self, s):
        num = '<mn>{}</mn>'
        letter = '<mi>{}</mi>'
        new_s = ''
        current_element = ''
        current_count = ''
        
        for i, c in enumerate(s):
            if c.isdigit():
                current_count += c  # Acumula os dígitos para o número atual
            else:
                if current_element:
                    if current_count:
                        # Se temos um número, adicionamos como subscrito
                        new_s += f'<msub>{letter.format(current_element)}{num.format(current_count)}</msub>'
                    else:
                        # Se não temos um número, apenas adicionamos o elemento
                        new_s += letter.format(current_element)
                # Começamos um novo elemento
                current_element = c
                current_count = ''
        
        # Encapsulamos o último elemento após o loop
        if current_element:
            if current_count:
                new_s += f'<msub>{letter.format(current_element)}{num.format(current_count)}</msub>'
            else:
                new_s += letter.format(current_element)
        
        return new_s   
    
    def transform_value(self, value):
        value = value.replace(',','.')
        value = float(value)
        if value == int(value):
            value = round(value)
            value = str(value)
        else:
            value = f'{value:.4f}'
        value = value.replace('.', ',')
        return value
    
    




with open('back/reactions.csv', 'r') as f:
    fcsv = csv.reader(f, delimiter=';')
    data_csv = [tuple(line) for line in fcsv]

draw = DrawReactionHTML(data_csv)
draw.run()

with open('file.html', 'w') as f:
    f.write(draw.html_string)





