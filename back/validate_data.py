import csv
from back.errors import InvalidFormatData, InvalidFormatFile
import re


class ValidateData:
    def __init__(self, stream, is_single_reaction):
        if is_single_reaction:
            self.data = self.__single_reaction(stream)
            
        else:
            self.data = self.__check_csv(stream)
 
    def __check_csv(self, data):
        data_csv = data.split('\r\n')
        data_csv = csv.reader(data_csv, delimiter=';', doublequote=False)
        data_csv = [tuple(line) for line in data_csv if line]        
    
        for line in data_csv:
            if len(line) != 2:
                raise InvalidFormatFile("Total Columns differs from 2")
            
            if not re.match(r'^-?\d+([,.]\d+)?$', line[0]):
                 raise InvalidFormatFile("First column must be a number, could be separated by point or comma")
             
        return data_csv
        
    def __single_reaction(self, data):
        reactants = data["reactants"]
        products = data["products"]
        
        if not reactants:
            raise InvalidFormatData("Empty Values for reactants")
        
        if not products:
            raise InvalidFormatData("Empty Values for products")
        
        if "+" not in reactants or "+" not in products:
            raise InvalidFormatData("Format Invalid. Please provide a correct format. Example: A + B")
        
        
        reactants_handled = self.__handle_string_reaction(reactants, True)
        products_handled = self.__handle_string_reaction(products)
        
        data_reaction = reactants_handled + products_handled

        return data_reaction


    def __handle_string_reaction(self, components, is_reactants=False):
        reaction_list = components.split("+")
        reaction_list = [reaction.strip() for reaction in reaction_list]
        data_reaction = []
        
        for component in reaction_list:
            coef, formula = self.__separate_coef_formula(component)
            if is_reactants:
                coef  = '-' + coef
            
            data_reaction.append((coef, formula))
            

        return data_reaction
    
    def __separate_coef_formula(self, component):
        coef = ''
        formula = ''
        symbols = [",", "."]
        iscoef = True 
        for c in component:
            if iscoef: 
                if c.isnumeric() or c in symbols:
                    coef += c 
                    continue
                iscoef = False 
            
            formula += c
        if not coef:
            coef = "1"
        return coef, formula
                
        
        
if __name__ == '__main__':
    
    data_reaction = {
        "reactants": "2.5C4H10 + 1,3O2",
        "products": "8CO2 + 10H2O"
    }           
    
    
    reaction = ValidateData(data_reaction, True)
    print(reaction.data_reaction)
            
            


    
        
        
        