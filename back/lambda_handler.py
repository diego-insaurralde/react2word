from draw_reaction import DrawReactionHTML
from validate_data import ValidateData

import json
import errors

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        reaction_data = data["reactionData"]
        is_single_reaction = data["isSingleReaction"]  
        
        reaction_data = ValidateData(reaction_data, is_single_reaction)
        reaction_draw = DrawReactionHTML(reaction_data.data)
        reaction_string = reaction_draw.run()

        return {
            'statusCode': 203,
            'body': json.dumps({'reactionString': reaction_string})
        }
            
    
    except errors.InvalidFormatFile as e:
        return {
          'statusCode': 415  
        }   
        
    except errors.InvalidFormatData as e:
        return {
          'statusCode': 400  
        }   


    except Exception as e:
        return {
          'statusCode': 500  
        }