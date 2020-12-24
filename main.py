import pygame, sys
from pygame.locals import *
import random

class membro():
    def __init__(self,x,y):
        self.x=x
        self.y=y

class comida():
    def __init__(self,x,y):
        self.x=x
        self.y=y

class game():
    cobra=[membro(50,150)]
    comida=comida(0,0)
    color=(0,255,0)

def main():
    pygame.init()
    pygame.font.init()
    text = pygame.font.SysFont('Comic Sans MS', 15)
    MAX=500
    DISPLAY=pygame.display.set_mode((MAX,MAX),0,32)

    WHITE=(255,255,255)
    BLUE=(0,0,255)
    RED=(255,0,0)
    GREEN=(0,255,0)
    BLACK=(0,0,0)
    sides = [ 'w','a','s','d']
    direction = 'w'
    i = 0
    jogo = game
    
    def randColor():
        jogo.color = (random.randrange(50,255),random.randrange(50,255),random.randrange(50,255))

    def move():
        cabeca = jogo.cobra[0]
        novoMembro = membro(-50,-50)
        if direction == 'w':
            if cabeca.y-50<0:
                novoMembro = membro(cabeca.x,MAX-50 )
            else:
                novoMembro = membro(cabeca.x,cabeca.y-50 )
        if direction == 'a':
            if cabeca.x-50<0:
                novoMembro = membro(MAX-50,cabeca.y )
            else:
                novoMembro = membro(cabeca.x-50,cabeca.y )
        if direction == 's':
            if cabeca.y+50>MAX-50:
                novoMembro = membro(cabeca.x,0)
            else:
                novoMembro = membro(cabeca.x,cabeca.y+50 )
        if direction == 'd':
            if cabeca.x+50>MAX-50:
                novoMembro = membro(0,cabeca.y )
            else:
                novoMembro = membro(cabeca.x+50,cabeca.y)
        if(novoMembro in jogo.cobra):
            alive = False
        jogo.cobra.insert(0,novoMembro)

        if cabeca.x == jogo.comida.x and cabeca.y == jogo.comida.y:
            randColor()
            jogo.cobra.append(jogo.cobra[len(jogo.cobra)-1])
            geterateFood()
        jogo.cobra = jogo.cobra[:-1]
   
    def paintSnake():
        color = jogo.color
        paintFood()
        for el in jogo.cobra:
            index = jogo.cobra.index(el)
            if(index==0):
                pygame.draw.rect(DISPLAY,BLACK,(el.x,el.y,50,50))
                pygame.draw.rect(DISPLAY,color,(el.x+23,el.y+23,4,4))
                pygame.draw.rect(DISPLAY,color,(el.x,el.y,50,4))
                pygame.draw.rect(DISPLAY,color,(el.x,el.y,4,50))
                pygame.draw.rect(DISPLAY,color,(el.x,el.y+46,50,4))
                pygame.draw.rect(DISPLAY,color,(el.x+46,el.y,4,50))
            else:
                pygame.draw.rect(DISPLAY,BLACK,(el.x,el.y,50,50))
                pygame.draw.rect(DISPLAY,color,(el.x,el.y+23,50,4))
                pygame.draw.rect(DISPLAY,color,(el.x+23,el.y,4,50))
                # if(index % 2 == 0):
                #     pygame.draw.rect(DISPLAY,GREEN,(el.x,el.y,50,50))
                # else:
                #     pygame.draw.rect(DISPLAY,GREEN,(el.x,el.y,50,50))

    def paintFood():
        pygame.draw.rect(DISPLAY,RED,(jogo.comida.x,jogo.comida.y,50,50))

    def geterateFood():
        vazio = [] 
        for i in range(0, MAX-50, 50):
            for j in range(0, MAX-50, 50):
                candidata = membro(i,j)
                if candidata not in jogo.cobra:
                    vazio.append(candidata)
        if len(vazio) > 0:
            jogo.comida = vazio[random.randrange(0, len(vazio)-1)]
            paintFood()

    geterateFood()
    alive = True
    while alive:
        i+=1
        if i>=200:
            move()
            i=0
        DISPLAY.fill(BLACK)
        paintSnake()
        DISPLAY.blit(text.render(str(len(jogo.cobra)), False, WHITE),(0,0))
        
        for event in pygame.event.get():
            if event.type==KEYDOWN:
                if  event.unicode in sides:
                    direction = event.unicode 
            if event.type==QUIT:
                pygame.quit()
                sys.exit()
        pygame.display.update()

main()